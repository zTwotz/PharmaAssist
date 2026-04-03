import { Test, TestingModule } from '@nestjs/testing';
import { AiAuditLogController } from './ai-audit-log.controller';
import { AiAuditLogService } from './ai-audit-log.service';
import { GetAiAuditLogsDto } from './dto/get-ai-audit-logs.dto';

describe('AiAuditLogController', () => {
  let controller: AiAuditLogController;
  let service: AiAuditLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiAuditLogController],
      providers: [
        {
          provide: AiAuditLogService,
          useValue: {
            getLogs: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AiAuditLogController>(AiAuditLogController);
    service = module.get<AiAuditLogService>(AiAuditLogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get logs', async () => {
    const query: GetAiAuditLogsDto = { page: 1, limit: 10 };
    const mockResult = {
      items: [],
      meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    };

    jest.spyOn(service, 'getLogs').mockResolvedValue(mockResult);

    const result = await controller.getLogs(query);

    expect(service.getLogs).toHaveBeenCalledWith(query);
    expect(result).toEqual(mockResult);
  });
});
