import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async likeRun(runId: string, userId: string) {
    const run = await this.prisma.run.findUnique({ where: { id: runId } });
    if (!run) {
      throw new NotFoundException('Run not found');
    }

    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_runId: {
          userId,
          runId,
        },
      },
    });

    if (existingLike) {
      throw new ConflictException('Already liked this run');
    }

    return this.prisma.like.create({
      data: {
        userId,
        runId,
      },
    });
  }

  async unlikeRun(runId: string, userId: string) {
    const like = await this.prisma.like.findUnique({
      where: {
        userId_runId: {
          userId,
          runId,
        },
      },
    });

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.prisma.like.delete({
      where: {
        id: like.id,
      },
    });

    return { message: 'Run unliked successfully' };
  }

  async checkLike(runId: string, userId: string) {
    const like = await this.prisma.like.findUnique({
      where: {
        userId_runId: {
          userId,
          runId,
        },
      },
    });

    return { liked: !!like };
  }
}
