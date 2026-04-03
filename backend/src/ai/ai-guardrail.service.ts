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

  private readonly unsafeOutputCategories = [
    {
      name: 'Diagnosis Advice',
      keywords: ['bạn bị', 'chẩn đoán của bạn là', 'bạn đang mắc', 'có thể bạn bị'],
      message: 'AI Copilot phát sinh phản hồi có dấu hiệu chẩn đoán bệnh. Nội dung đã bị chặn để đảm bảo an toàn.',
    },
    {
      name: 'Prescribing Advice',
      keywords: ['bạn nên dùng', 'kê đơn', 'hãy uống thuốc này', 'nên mua loại thuốc'],
      message: 'AI Copilot phát sinh phản hồi có dấu hiệu kê đơn thuốc. Nội dung đã bị chặn để đảm bảo an toàn.',
    },
    {
      name: 'Dosage Advice',
      keywords: ['uống 2 viên', 'uống 3 viên', 'uống 1 viên', 'liều dùng cho bạn là'],
      message: 'AI Copilot phát sinh phản hồi có dấu hiệu khuyên dùng liều lượng cụ thể. Nội dung đã bị chặn để đảm bảo an toàn.',
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

  checkOutput(text: string): void {
    if (!text) return;
    const textToCheck = text.toLowerCase();

    for (const category of this.unsafeOutputCategories) {
      for (const keyword of category.keywords) {
        if (textToCheck.includes(keyword)) {
          this.logger.error(`Guardrail blocked AI OUTPUT for category: ${category.name}. Keyword: ${keyword}`);
          throw new BadRequestException(`Phản hồi bị chặn bởi Guardrail: ${category.message}`);
        }
      }
    }
  }
}
