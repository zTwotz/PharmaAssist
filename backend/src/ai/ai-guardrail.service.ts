import { Injectable, BadRequestException, Logger } from '@nestjs/common';

@Injectable()
export class AiGuardrailService {
  private readonly logger = new Logger(AiGuardrailService.name);

  private readonly unsafeCategories = [
    {
      name: 'Diagnosis Request',
      keywords: ['chẩn đoán', 'chuẩn đoán', 'bệnh gì', 'đây là bệnh gì'],
      message: 'Không được phép yêu cầu chẩn đoán y khoa. Vui lòng khuyên bệnh nhân đến gặp Bác sĩ.',
    },
    {
      name: 'Prescribing Request',
      keywords: ['kê đơn', 'kê loại', 'phác đồ', 'nên kê', 'kê thuốc'],
      message: 'Không được phép yêu cầu kê đơn thuốc. Việc kê đơn thuộc thẩm quyền của Bác sĩ điều trị.',
    },
    {
      name: 'Dosage Advice Request',
      keywords: ['liều dùng', 'liều lượng', 'uống mấy viên', 'bao nhiêu mg', 'dùng bao nhiêu'],
      message: 'Không được phép yêu cầu tư vấn liều lượng vượt tiêu chuẩn. Vui lòng tham khảo Dược thư quốc gia hoặc Bác sĩ chuyên khoa.',
    },
    {
      name: 'Out-of-scope Pharmacy Support',
      keywords: ['lách luật', 'hack', 'tài chính', 'dự đoán'],
      message: 'Yêu cầu nằm ngoài phạm vi hỗ trợ Dược khoa của AI Copilot.',
    },
  ];

  checkInput(text: string): void {
    if (!text) return;
    const textToCheck = text.toLowerCase();

    for (const category of this.unsafeCategories) {
      for (const keyword of category.keywords) {
        if (textToCheck.includes(keyword)) {
          this.logger.warn(`Guardrail blocked input for category: ${category.name}. Keyword: ${keyword}`);
          throw new BadRequestException(`Yêu cầu bị chặn bởi Guardrail: ${category.message}`);
        }
      }
    }
  }
}
