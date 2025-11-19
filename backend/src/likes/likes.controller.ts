import { Controller, Post, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('likes')
@Controller('likes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post('runs/:runId')
  @ApiOperation({ summary: 'Like a run' })
  async likeRun(@Param('runId') runId: string, @CurrentUser() user: any) {
    return this.likesService.likeRun(runId, user.id);
  }

  @Delete('runs/:runId')
  @ApiOperation({ summary: 'Unlike a run' })
  async unlikeRun(@Param('runId') runId: string, @CurrentUser() user: any) {
    return this.likesService.unlikeRun(runId, user.id);
  }

  @Get('runs/:runId/check')
  @ApiOperation({ summary: 'Check if user liked a run' })
  async checkLike(@Param('runId') runId: string, @CurrentUser() user: any) {
    return this.likesService.checkLike(runId, user.id);
  }
}
