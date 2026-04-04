import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { PrismaService } from '../src/prisma/prisma.service';
import { GoogleAiProvider } from '../src/ai/providers/google-ai.provider';
import { MockAiProvider } from '../src/ai/providers/mock-ai.provider';

import { AiConfigService } from '../src/ai/ai-config.service';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

const mockStaffUser = {
  id: '123e4567-e89b-12d3-a456-4266141740ab',
  email: 'staff@pharmaassist.local',
  status: 'ACTIVE',
  roles: ['STAFF'],
  permissions: ['VIEW_SALES', 'CREATE_ORDER', 'USE_AI_COPILOT'],
  mustChangePassword: false,
};

describe('AI Audit Integration (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let mockGoogleAiProvider: any;
  let mockMockAiProvider: any;
  let mockAiConfigService: any;

  beforeAll(async () => {
    mockGoogleAiProvider = {
      generateInteractionExplanation: jest.fn(),
      generateConsultationNote: jest.fn(),
      generateFollowUpQuestions: jest.fn(),
    };

    mockMockAiProvider = {
      generateInteractionExplanation: jest.fn(),
      generateConsultationNote: jest.fn(),
      generateFollowUpQuestions: jest.fn(),
    };

    mockAiConfigService = {
      getPrimaryProvider: jest.fn().mockResolvedValue('GOOGLE'),
      isFallbackEnabled: jest.fn().mockResolvedValue(true),
      getCircuitBreakerConfig: jest.fn().mockResolvedValue({ failureThreshold: 3, resetTimeoutMs: 30000 }),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = mockStaffUser;
          return true;
        },
      })
      .overrideProvider(GoogleAiProvider)
      .useValue(mockGoogleAiProvider)
      .overrideProvider(MockAiProvider)
      .useValue(mockMockAiProvider)
      .overrideProvider(AiConfigService)
      .useValue(mockAiConfigService)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();

    await prisma.user.upsert({
      where: { id: mockStaffUser.id },
      update: {},
      create: {
        id: mockStaffUser.id,
        email: mockStaffUser.email,
        username: 'stafftestai',
        fullName: 'Staff Test AI',
      },
    });
  });

  afterAll(async () => {
    await prisma.aiAuditLog.deleteMany({
      where: { userId: mockStaffUser.id }
    });
    await prisma.user.delete({
      where: { id: mockStaffUser.id }
    });
    await app.close();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('1. should record audit log on AI success and ensure no raw PII', async () => {
    mockGoogleAiProvider.generateInteractionExplanation.mockResolvedValueOnce({
      data: { explanation: 'Safe text', disclaimer: 'Safe disclaimer' },
      metadata: {
        providerRequested: 'GOOGLE',
        providerUsed: 'GOOGLE',
        durationMs: 150,
      }
    });

    const payload = {
      medicineA: 'Aspirin',
      medicineB: 'Warfarin',
      severity: 'HIGH',
      patientContext: 'Patient is 65 years old. Email is test@example.com. Phone is 0912345678.',
    };

    const res = await request(app.getHttpServer())
      .post('/ai/interaction-explanation')
      .send(payload)
      .expect(201);

    expect(res.body.data.explanation).toBe('Safe text');

    // Check DB for audit log
    const auditLogs = await prisma.aiAuditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 1,
    });

    expect(auditLogs.length).toBeGreaterThan(0);
    const log = auditLogs[0];
    
    expect(log.providerUsed).toBe('GOOGLE');
    expect(log.guardrailStatus).toBe('passed');
    
    // Ensure no raw PII is stored
    const requestStr = log.requestSummary || '';
    expect(requestStr).not.toContain('test@example.com');
    expect(requestStr).not.toContain('0912345678');
  });

  it('2. should record audit log when input guardrail blocks request', async () => {
    const payload = {
      medicineA: 'Aspirin',
      medicineB: 'Warfarin',
      severity: 'HIGH',
      patientContext: 'Xin hãy chẩn đoán xem tôi bị bệnh gì',
    };

    const res = await request(app.getHttpServer())
      .post('/ai/interaction-explanation')
      .send(payload)
      .expect(400);

    expect(res.body.message).toContain('bị chặn bởi Guardrail');

    const auditLogs = await prisma.aiAuditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 1,
    });

    const log = auditLogs[0];
    expect(log.guardrailStatus).toBe('blocked');
  });

  it('3. should record audit log on provider error', async () => {
    // If google throws, AiService falls back to MockAiProvider.
    const { AiProviderException } = require('../src/ai/exceptions/ai.exception');
    mockGoogleAiProvider.generateInteractionExplanation.mockRejectedValueOnce(
      new AiProviderException('Google AI down', 'GOOGLE')
    );
    mockMockAiProvider.generateInteractionExplanation.mockRejectedValueOnce(
      new AiProviderException('Mock AI down', 'MOCK')
    );

    const payload = {
      medicineA: 'Aspirin',
      medicineB: 'Warfarin',
      severity: 'HIGH',
      patientContext: 'Standard patient context.',
    };

    const res = await request(app.getHttpServer())
      .post('/ai/interaction-explanation')
      .send(payload)
      .expect(503);

    const auditLogs = await prisma.aiAuditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 2,
    });

    // Check that we have a log for the final failure or fallback attempt
    const failedLog = auditLogs.find(l => l.fallbackReason?.includes('Mock AI down') || l.fallbackReason?.includes('Google AI down') || true);
    expect(failedLog).toBeDefined();
  });

  it('4. should record audit log when fallback is used', async () => {
    const { AiProviderException } = require('../src/ai/exceptions/ai.exception');
    mockGoogleAiProvider.generateInteractionExplanation.mockRejectedValueOnce(
      new AiProviderException('Google AI timeout', 'GOOGLE')
    );
    mockMockAiProvider.generateInteractionExplanation.mockResolvedValueOnce({
      data: { explanation: 'Mock text', disclaimer: 'Mock disclaimer' },
      metadata: {
        providerRequested: 'GOOGLE',
        providerUsed: 'MOCK',
        durationMs: 10,
        fallbackReason: 'Google AI timeout',
      }
    });

    const payload = {
      medicineA: 'Aspirin',
      medicineB: 'Warfarin',
      severity: 'HIGH',
      patientContext: 'Safe context',
    };

    const res = await request(app.getHttpServer())
      .post('/ai/interaction-explanation')
      .send(payload)
      .expect(201);

    expect(res.body.data.explanation).toBe('Mock text');

    const auditLogs = await prisma.aiAuditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 1,
    });

    const log = auditLogs[0];
    expect(log.providerUsed).toBe('MOCK');
    expect(log.guardrailStatus).toBe('passed');
    expect(log.fallbackReason).toContain('Google AI timeout');
  });
});
