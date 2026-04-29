import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePromptDto, UpdatePromptStatusDto } from './dto/create-prompt.dto';
import { PrismaService } from '../prisma/prisma.service';

export interface PromptTemplateData {
  content: string;
  version: string;
}

@Injectable()
export class PromptsService {
  private readonly logger = new Logger(PromptsService.name);

  constructor(private readonly prisma: PrismaService) {}

  
  async findAll() {
    return this.prisma.promptTemplate.findMany({
      orderBy: [
        { code: 'asc' },
        { version: 'desc' },
      ],
    });
  }

  async findOne(id: string) {
    return this.prisma.promptTemplate.findUnique({
      where: { id },
    });
  }

  async create(dto: CreatePromptDto) {
    // If setting as ACTIVE, we might want to set others of the same code to ARCHIVED
    if (dto.status === 'ACTIVE') {
      await this.prisma.promptTemplate.updateMany({
        where: { code: dto.code, status: 'ACTIVE' },
        data: { status: 'ARCHIVED' },
      });
    }

    return this.prisma.promptTemplate.create({
      data: {
        code: dto.code,
        version: dto.version,
        content: dto.content,
        status: dto.status || 'DRAFT',
      },
    });
  }

  async updateStatus(id: string, dto: UpdatePromptStatusDto) {
    if (dto.status === 'ACTIVE') {
      const target = await this.prisma.promptTemplate.findUnique({ where: { id } });
      if (target) {
        await this.prisma.promptTemplate.updateMany({
          where: { code: target.code, status: 'ACTIVE' },
          data: { status: 'ARCHIVED' },
        });
      }
    }

    return this.prisma.promptTemplate.update({
      where: { id },
      data: { status: dto.status },
    });
  }

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
