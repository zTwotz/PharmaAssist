import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface PromptTemplateData {
  content: string;
  version: string;
}

@Injectable()
export class PromptsService {
  private readonly logger = new Logger(PromptsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getPromptTemplate(code: string): Promise<PromptTemplateData> {
    const template = await this.prisma.promptTemplate.findFirst({
      where: {
        code,
        status: 'ACTIVE',
      },
      orderBy: {
        version: 'desc',
      },
    });

    if (!template) {
      this.logger.error(`Missing active prompt template for use case: ${code}`);
      throw new InternalServerErrorException(
        `AI Configuration Error: Missing prompt template for ${code}`,
      );
    }

    return {
      content: template.content,
      version: template.version,
    };
  }

  compilePrompt(template: string, variables: Record<string, string>): string {
    let compiled = template;
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      compiled = compiled.replace(regex, value);
    }
    return compiled;
  }
}
