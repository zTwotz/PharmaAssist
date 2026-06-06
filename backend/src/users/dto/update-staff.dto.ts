import { IsInt, IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateStaffRoleStatusDto {
  @IsOptional()
  @IsInt()
  roleId?: number;

  @IsOptional()
  @IsString()
  @IsIn(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'BANNED'])
  status?: string;
}
