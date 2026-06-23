import { Controller, Get, UseGuards } from '@nestjs/common';
import { MedicineGroupsService } from './medicine-groups.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';

@Controller('medicine-groups')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class MedicineGroupsController {
  constructor(private readonly medicineGroupsService: MedicineGroupsService) {}

  @Get()
  @RequirePermissions('VIEW_MEDICINES')
  async findAll() {
    return this.medicineGroupsService.findAll();
  }
}
