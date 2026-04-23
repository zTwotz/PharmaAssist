import { Module } from '@nestjs/common';
import { GraphQueryTemplateService } from './graph-query-template.service';

@Module({
  providers: [GraphQueryTemplateService],
  exports: [GraphQueryTemplateService],
})
export class GraphQueryTemplateModule {}
