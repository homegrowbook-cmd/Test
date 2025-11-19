import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { EntriesService } from './entries.service';
import { CreateEntryDto, UpdateEntryDto } from './dto/entry.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('entries')
@Controller('runs/:runId/entries')
export class EntriesController {
  constructor(private entriesService: EntriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new entry for a run' })
  async create(
    @Param('runId') runId: string,
    @CurrentUser() user: any,
    @Body() createEntryDto: CreateEntryDto,
  ) {
    return this.entriesService.create(runId, user.id, createEntryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all entries for a run' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Param('runId') runId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.entriesService.findAllByRun(runId, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single entry by ID' })
  async findOne(@Param('id') id: string) {
    return this.entriesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an entry' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateEntryDto: UpdateEntryDto,
  ) {
    return this.entriesService.update(id, user.id, updateEntryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an entry' })
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.entriesService.remove(id, user.id);
  }
}
