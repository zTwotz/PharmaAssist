import { Test, TestingModule } from '@nestjs/testing';
import { GraphSyncController } from './graph-sync.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Reflector } from '@nestjs/core';
import { UseGuards } from '@nestjs/common';

describe('GraphSyncController', () => {
  let controller: GraphSyncController;
  let prismaService: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GraphSyncController],
      providers: [
        {
          provide: PrismaService,
          useValue: {
            graphSyncOutbox: {
              findMany: jest.fn().mockResolvedValue([]),
              count: jest.fn().mockResolvedValue(0),
              findUnique: jest.fn().mockResolvedValue({ id: '1' }),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<GraphSyncController>(GraphSyncController);
    prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Permission Checks (PAC-TASK-530)', () => {
    it('should use JwtAuthGuard and RolesGuard at the controller level', () => {
      const guards = Reflect.getMetadata('__guards__', GraphSyncController);
      expect(guards).toBeDefined();
      expect(guards).toContain(JwtAuthGuard);
      expect(guards).toContain(RolesGuard);
    });

    it('Admin access list = allowed: getStatusList should have ADMIN role', () => {
      const roles = Reflect.getMetadata(
        'roles',
        GraphSyncController.prototype.getStatusList,
      );
      expect(roles).toEqual(['ADMIN']);
    });

    it('Admin access detail = allowed: getStatusDetail should have ADMIN role', () => {
      const roles = Reflect.getMetadata(
        'roles',
        GraphSyncController.prototype.getStatusDetail,
      );
      expect(roles).toEqual(['ADMIN']);
    });

    it('Staff access list = denied: getStatusList should not have STAFF role', () => {
      const roles = Reflect.getMetadata(
        'roles',
        GraphSyncController.prototype.getStatusList,
      );
      expect(roles).not.toContain('STAFF');
    });

    it('Staff access detail = denied: getStatusDetail should not have STAFF role', () => {
      const roles = Reflect.getMetadata(
        'roles',
        GraphSyncController.prototype.getStatusDetail,
      );
      expect(roles).not.toContain('STAFF');
    });

    it('Warehouse access list = denied: getStatusList should not have WAREHOUSE role', () => {
      const roles = Reflect.getMetadata(
        'roles',
        GraphSyncController.prototype.getStatusList,
      );
      expect(roles).not.toContain('WAREHOUSE');
    });

    it('Warehouse access detail = denied: getStatusDetail should not have WAREHOUSE role', () => {
      const roles = Reflect.getMetadata(
        'roles',
        GraphSyncController.prototype.getStatusDetail,
      );
      expect(roles).not.toContain('WAREHOUSE');
    });

    it('Missing authentication = denied: JwtAuthGuard protects the controller', () => {
      const guards = Reflect.getMetadata('__guards__', GraphSyncController);
      expect(guards).toContain(JwtAuthGuard);
    });

    it('Invalid session = denied: JwtAuthGuard protects the controller', () => {
      const guards = Reflect.getMetadata('__guards__', GraphSyncController);
      expect(guards).toContain(JwtAuthGuard);
    });

    it('Invalid role = denied: RolesGuard protects the controller', () => {
      const guards = Reflect.getMetadata('__guards__', GraphSyncController);
      expect(guards).toContain(RolesGuard);
    });

    it('Permission check không thay đổi Graph Sync job data', async () => {
      await controller.getStatusList();
      expect(prismaService.graphSyncOutbox.findMany).toHaveBeenCalled();
      expect(prismaService.graphSyncOutbox.count).toHaveBeenCalled();

      await controller.getStatusDetail('1');
      expect(prismaService.graphSyncOutbox.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { attempts: true },
      });

      // Ensure no update/create/delete were called
      expect((prismaService.graphSyncOutbox as any).update).toBeUndefined();
      expect((prismaService.graphSyncOutbox as any).create).toBeUndefined();
      expect((prismaService.graphSyncOutbox as any).delete).toBeUndefined();
    });
  });
});
