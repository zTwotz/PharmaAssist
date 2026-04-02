import { Test, TestingModule } from '@nestjs/testing';
import { AiAuditLogService } from './ai-audit-log.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AiAuditLogService', () => {
  let service: AiAuditLogService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiAuditLogService,
        {
          provide: PrismaService,
          useValue: {
            aiAuditLog: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AiAuditLogService>(AiAuditLogService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should write audit log successfully', async () => {
    const dto = {
      userId: 'test-user',
      providerRequested: 'google',
      providerUsed: 'google',
      promptType: 'explain_alert',
    };

    await service.log(dto);

    expect(prisma.aiAuditLog.create).toHaveBeenCalledWith({
      data: dto,
    });
  });

  it('should catch error and not throw to avoid blocking main thread', async () => {
    jest.spyOn(prisma.aiAuditLog, 'create').mockRejectedValue(new Error('DB Error'));

    const dto = {
      userId: 'test-user',
      providerRequested: 'google',
      providerUsed: 'google',
      promptType: 'explain_alert',
    };

    // Should not throw
    await expect(service.log(dto)).resolves.not.toThrow();
    expect(prisma.aiAuditLog.create).toHaveBeenCalled();
  });
});
