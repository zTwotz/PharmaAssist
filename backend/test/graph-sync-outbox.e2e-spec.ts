import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

describe('GraphSyncOutbox Prisma Schema Verification (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should successfully perform CRUD operations on GraphSyncOutbox and GraphSyncAttempt', async () => {
    // 1. Create Outbox event
    const outboxEvent = await prisma.graphSyncOutbox.create({
      data: {
        eventType: 'GRAPH_REBUILD_REQUESTED',
        aggregateType: 'System',
        aggregateId: 'system-1',
        sourceVersion: 1n,
        status: 'PENDING',
        payload: { reason: 'manual trigger' },
      },
    });

    expect(outboxEvent.id).toBeDefined();
    expect(outboxEvent.retryCount).toBe(0);

    // 2. Create Attempt
    const attempt = await prisma.graphSyncAttempt.create({
      data: {
        outboxId: outboxEvent.id,
        attemptNumber: 1,
        status: 'SUCCESS',
        startedAt: new Date(),
        finishedAt: new Date(),
        durationMs: 150,
      },
    });

    expect(attempt.id).toBeDefined();

    // 3. Delete Outbox and verify cascade delete
    await prisma.graphSyncOutbox.delete({
      where: { id: outboxEvent.id },
    });

    const attemptCount = await prisma.graphSyncAttempt.count({
      where: { id: attempt.id },
    });

    expect(attemptCount).toBe(0);
  });
});
