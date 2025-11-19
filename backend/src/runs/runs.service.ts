import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRunDto, UpdateRunDto } from './dto/run.dto';

@Injectable()
export class RunsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createRunDto: CreateRunDto) {
    const run = await this.prisma.run.create({
      data: {
        title: createRunDto.title,
        description: createRunDto.description,
        strainName: createRunDto.strainName,
        strainType: createRunDto.strainType,
        isPublic: createRunDto.isPublic ?? true,
        lightType: createRunDto.lightType,
        lightWatts: createRunDto.lightWatts,
        medium: createRunDto.medium,
        nutrients: createRunDto.nutrients,
        phase: createRunDto.phase,
        user: {
          connect: { id: userId },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return run;
  }

  async findAll(page = 1, limit = 10, phase?: string) {
    const skip = (page - 1) * limit;
    const where: any = { isPublic: true };

    if (phase) {
      where.phase = phase;
    }

    const [runs, total] = await Promise.all([
      this.prisma.run.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              entries: true,
              likes: true,
              comments: true,
            },
          },
        },
      }),
      this.prisma.run.count({ where }),
    ]);

    return {
      runs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const run = await this.prisma.run.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
            bio: true,
          },
        },
        _count: {
          select: {
            entries: true,
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!run) {
      throw new NotFoundException('Run not found');
    }

    if (!run.isPublic) {
      throw new ForbiddenException('This run is private');
    }

    return run;
  }

  async update(id: string, userId: string, updateRunDto: UpdateRunDto) {
    const run = await this.prisma.run.findUnique({
      where: { id },
    });

    if (!run) {
      throw new NotFoundException('Run not found');
    }

    if (run.userId !== userId) {
      throw new ForbiddenException('You can only update your own runs');
    }

    return this.prisma.run.update({
      where: { id },
      data: updateRunDto,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    const run = await this.prisma.run.findUnique({
      where: { id },
    });

    if (!run) {
      throw new NotFoundException('Run not found');
    }

    if (run.userId !== userId) {
      throw new ForbiddenException('You can only delete your own runs');
    }

    await this.prisma.run.delete({
      where: { id },
    });

    return { message: 'Run deleted successfully' };
  }

  async getTrending(limit = 10) {
    const runs = await this.prisma.run.findMany({
      where: { isPublic: true },
      take: limit,
      orderBy: {
        likes: {
          _count: 'desc',
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            entries: true,
            likes: true,
            comments: true,
          },
        },
      },
    });

    return runs;
  }
}
