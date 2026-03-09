import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ActiveIngredientsService } from './active-ingredients.service';
import {
  CreateActiveIngredientDto,
  UpdateActiveIngredientDto,
} from './dto/active-ingredients.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';

@Controller('active-ingredients')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ActiveIngredientsController {
  constructor(
    private readonly activeIngredientsService: ActiveIngredientsService,
  ) {}

  @Post()
  @RequirePermissions('MANAGE_MEDICINES')
  async create(@Body() createDto: CreateActiveIngredientDto) {
    return this.activeIngredientsService.create(createDto);
  }

  @Patch(':id')
  @RequirePermissions('MANAGE_MEDICINES')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateActiveIngredientDto,
  ) {
    return this.activeIngredientsService.update(id, updateDto);
  }

  @Get(':id')
  @RequirePermissions('VIEW_MEDICINES')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.activeIngredientsService.findOne(id);
  }

  @Get()
  @RequirePermissions('VIEW_MEDICINES')
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.activeIngredientsService.findAll({
      page: pageNum,
      limit: limitNum,
      search,
      status,
    });
  }
}
