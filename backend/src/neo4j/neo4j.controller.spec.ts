import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jController } from './neo4j.controller';
import { Neo4jService } from './neo4j.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('Neo4jController', () => {
  let controller: Neo4jController;
  let service: Neo4jService;

  beforeEach(async () => {
    const mockNeo4jService = {
      getDriver: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [Neo4jController],
      providers: [
        {
          provide: Neo4jService,
          useValue: mockNeo4jService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<Neo4jController>(Neo4jController);
    service = module.get<Neo4jService>(Neo4jService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkHealth', () => {
    it('should return ok when driver connectivity is verified', async () => {
      const mockVerifyConnectivity = jest.fn().mockResolvedValue(undefined);
      (service.getDriver as jest.Mock).mockReturnValue({
        verifyConnectivity: mockVerifyConnectivity,
      });

      const result = await controller.checkHealth();
      expect(result).toEqual({
        status: 'ok',
        message: 'Successfully connected to Neo4j AuraDB',
      });
      expect(mockVerifyConnectivity).toHaveBeenCalled();
    });

    it('should throw HttpException when connectivity fails', async () => {
      const mockVerifyConnectivity = jest.fn().mockRejectedValue(new Error('Connection error'));
      (service.getDriver as jest.Mock).mockReturnValue({
        verifyConnectivity: mockVerifyConnectivity,
      });

      await expect(controller.checkHealth()).rejects.toThrow(HttpException);
      await expect(controller.checkHealth()).rejects.toMatchObject({
        status: HttpStatus.SERVICE_UNAVAILABLE,
        response: {
          status: 'error',
          message: 'Failed to connect to Neo4j AuraDB',
        },
      });
    });

    it('should throw HttpException when driver is not initialized', async () => {
      (service.getDriver as jest.Mock).mockImplementation(() => {
        throw new Error('Neo4j Driver is not initialized.');
      });

      await expect(controller.checkHealth()).rejects.toThrow(HttpException);
      await expect(controller.checkHealth()).rejects.toMatchObject({
        status: HttpStatus.SERVICE_UNAVAILABLE,
        response: {
          status: 'error',
          message: 'Failed to connect to Neo4j AuraDB',
        },
      });
    });
  });
});
