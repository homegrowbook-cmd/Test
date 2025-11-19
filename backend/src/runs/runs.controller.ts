import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { RunsService } from './runs.service';
import { CreateRunDto, UpdateRunDto } from './dto/run.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('runs')
@Controller('runs')
export class RunsController {
  constructor(private runsService: RunsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new grow run' })
  async create(@CurrentUser() user: any, @Body() createRunDto: CreateRunDto) {
    return this.runsService.create(user.id, createRunDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all public runs' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'phase', required: false, type: String })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('phase') phase?: string,
  ) {
    return this.runsService.findAll(page, limit, phase);
  }

  @Get('trending')
  @ApiOperation({ summary: 'Get trending runs' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getTrending(@Query('limit') limit?: number) {
    return this.runsService.getTrending(limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single run by ID' })
  async findOne(@Param('id') id: string) {
    return this.runsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a run' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateRunDto: UpdateRunDto,
  ) {
    return this.runsService.update(id, user.id, updateRunDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a run' })
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.runsService.remove(id, user.id);
  }
}
