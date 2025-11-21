import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HarvestsService } from './harvests.service';
import { CreateHarvestDto, UpdateHarvestDto } from './dto/harvest.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('harvests')
@Controller('runs/:runId/harvest')
export class HarvestsController {
  constructor(private harvestsService: HarvestsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create harvest data for a run' })
  async create(
    @Param('runId') runId: string,
    @CurrentUser() user: any,
    @Body() createHarvestDto: CreateHarvestDto,
  ) {
    return this.harvestsService.create(runId, user.id, createHarvestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get harvest data for a run' })
  async findByRunId(@Param('runId') runId: string) {
    return this.harvestsService.findByRunId(runId);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update harvest data for a run' })
  async update(
    @Param('runId') runId: string,
    @CurrentUser() user: any,
    @Body() updateHarvestDto: UpdateHarvestDto,
  ) {
    return this.harvestsService.update(runId, user.id, updateHarvestDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete harvest data for a run' })
  async delete(@Param('runId') runId: string, @CurrentUser() user: any) {
    return this.harvestsService.delete(runId, user.id);
  }
}
