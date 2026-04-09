import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jService } from './neo4j.service';
import { ConfigService } from '@nestjs/config';

// Mock neo4j-driver
jest.mock('neo4j-driver', () => {
  const mockSession = {
    run: jest.fn(),
    close: jest.fn(),
  };

  const mockDriver = {
    verifyConnectivity: jest.fn(),
    close: jest.fn(),
    session: jest.fn(() => mockSession),
  };

  return {
    __esModule: true,
    default: {
      driver: jest.fn(() => mockDriver),
      auth: {
        basic: jest.fn(),
      },
      session: {
        READ: 'READ',
        WRITE: 'WRITE',
      },
    },
  };
});

import neo4j from 'neo4j-driver';

describe('Neo4jService', () => {
  let service: Neo4jService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Neo4jService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'NEO4J_URI') return 'bolt://localhost:7687';
              if (key === 'NEO4J_USERNAME') return 'neo4j';
              if (key === 'NEO4J_PASSWORD') return 'password';
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<Neo4jService>(Neo4jService);
    configService = module.get<ConfigService>(ConfigService);

    // Clear mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onApplicationBootstrap', () => {
    it('should initialize driver and verify connectivity', async () => {
      await service.onApplicationBootstrap();

      expect(neo4j.driver).toHaveBeenCalledWith(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'password'),
        expect.any(Object),
      );

      const driver = service.getDriver();
      expect(driver.verifyConnectivity).toHaveBeenCalled();
    });

    it('should not throw if connection fails', async () => {
      // Mock failure
      const driver = neo4j.driver('', neo4j.auth.basic('user', 'pass'));
      (driver.verifyConnectivity as jest.Mock).mockRejectedValueOnce(
        new Error('Connection failed'),
      );

      // Remock driver to return the failing driver
      (neo4j.driver as jest.Mock).mockReturnValueOnce(driver);

      // Should not throw
      await expect(service.onApplicationBootstrap()).resolves.not.toThrow();
    });

    it('should not initialize driver if credentials are missing', async () => {
      (configService.get as jest.Mock).mockReturnValue(null);

      await service.onApplicationBootstrap();

      expect(neo4j.driver).not.toHaveBeenCalled();
      expect(() => service.getDriver()).toThrow(
        'Neo4j Driver is not initialized.',
      );
    });
  });

  describe('onApplicationShutdown', () => {
    it('should close driver if initialized', async () => {
      await service.onApplicationBootstrap();
      const driver = service.getDriver();

      await service.onApplicationShutdown();

      expect(driver.close).toHaveBeenCalled();
    });

    it('should do nothing if driver is not initialized', async () => {
      // Not calling onApplicationBootstrap
      await expect(service.onApplicationShutdown()).resolves.not.toThrow();
    });
  });

  describe('read and write', () => {
    beforeEach(async () => {
      await service.onApplicationBootstrap();
    });

    it('should execute a read query and close session', async () => {
      const driver = service.getDriver();
      const session = driver.session();
      (session.run as jest.Mock).mockResolvedValue('read-result');

      const result = await service.read('MATCH (n) RETURN n');

      expect(driver.session).toHaveBeenCalledWith({
        defaultAccessMode: 'READ',
      });
      expect(session.run).toHaveBeenCalledWith('MATCH (n) RETURN n', undefined);
      expect(session.close).toHaveBeenCalled();
      expect(result).toBe('read-result');
    });

    it('should execute a write query and close session', async () => {
      const driver = service.getDriver();
      const session = driver.session();
      (session.run as jest.Mock).mockResolvedValue('write-result');

      const result = await service.write('CREATE (n:Test)', { id: 1 });

      expect(driver.session).toHaveBeenCalledWith({
        defaultAccessMode: 'WRITE',
      });
      expect(session.run).toHaveBeenCalledWith('CREATE (n:Test)', { id: 1 });
      expect(session.close).toHaveBeenCalled();
      expect(result).toBe('write-result');
    });

    it('should close session even if query throws', async () => {
      const driver = service.getDriver();
      const session = driver.session();
      (session.run as jest.Mock).mockRejectedValue(new Error('Query failed'));

      await expect(service.read('MATCH (n) RETURN n')).rejects.toThrow(
        'Query failed',
      );
      expect(session.close).toHaveBeenCalled();
    });
  });
});
