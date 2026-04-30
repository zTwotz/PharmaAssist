import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin/storage')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('medicines/:id/image')
  @Roles('ADMIN', 'STAFF')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedicineImage(
    @Param('id') id: string,
    @UploadedFile() file: any,
  ) {
    return this.storageService.uploadMedicineImage(file, parseInt(id, 10));
  }
}
