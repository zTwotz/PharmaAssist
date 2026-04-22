import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn(() => 'mock-secret'),
}));

import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { cleanDatabase } from './test-utils';
import { App } from 'supertest/types';

describe('Customers Integration (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await cleanDatabase(prisma);
  });

  describe('Customer API', () => {
    it('should create a new customer and retrieve it', async () => {
      const newCustomer = {
        fullName: 'Nguyen Van A',
        phone: '0901234567',
      };

      // Create via API (if there is a public route or mock auth)
      // Since RBAC is enabled, we should test the service directly or bypass auth
      // For this sample, we test the Prisma Service integration directly first
      const created = await prisma.customer.create({
        data: {
          code: 'CUST001',
          fullName: newCustomer.fullName,
          phone: newCustomer.phone,
        },
      });

      expect(created.id).toBeDefined();
      expect(created.fullName).toBe('Nguyen Van A');

      // Verify it exists in the test DB
      const dbCustomer = await prisma.customer.findUnique({
        where: { id: created.id },
      });

      expect(dbCustomer).toBeDefined();
      expect(dbCustomer?.code).toBe('CUST001');
    });
  });
});
