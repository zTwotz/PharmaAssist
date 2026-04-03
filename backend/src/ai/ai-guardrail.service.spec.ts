import { Test, TestingModule } from '@nestjs/testing';
import { AiGuardrailService } from './ai-guardrail.service';
import { BadRequestException } from '@nestjs/common';

describe('AiGuardrailService', () => {
  let service: AiGuardrailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiGuardrailService],
    }).compile();

    service = module.get<AiGuardrailService>(AiGuardrailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should pass safe input', () => {
    expect(() => service.checkInput('Tôi muốn hỏi về tác dụng phụ của Paracetamol')).not.toThrow();
  });

  it('should block diagnosis request', () => {
    expect(() => service.checkInput('Bác sĩ ơi, đây là bệnh gì?')).toThrow(BadRequestException);
    expect(() => service.checkInput('Bác sĩ ơi, đây là bệnh gì?')).toThrow('chẩn đoán y khoa');
  });

  it('should block prescribing request', () => {
    expect(() => service.checkInput('Nên kê đơn thuốc nào cho tôi?')).toThrow(BadRequestException);
    expect(() => service.checkInput('Nên kê đơn thuốc nào cho tôi?')).toThrow('kê đơn thuốc');
  });

  it('should block dosage advice request', () => {
    expect(() => service.checkInput('Trẻ em uống mấy viên một ngày?')).toThrow(BadRequestException);
    expect(() => service.checkInput('Trẻ em uống mấy viên một ngày?')).toThrow('liều lượng');
  });

  it('should block out-of-scope request', () => {
    expect(() => service.checkInput('Cho tôi lời khuyên về tài chính')).toThrow(BadRequestException);
  });
});
