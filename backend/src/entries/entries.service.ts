import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEntryDto, UpdateEntryDto } from './dto/entry.dto';

@Injectable()
export class EntriesService {
  constructor(private prisma: PrismaService) {}

  async create(runId: string, userId: string, createEntryDto: CreateEntryDto) {
    // Verify run exists and user has access
    const run = await this.prisma.run.findUnique({
      where: { id: runId },
    });

    if (!run) {
      throw new NotFoundException('Run not found');
    }

    if (run.userId !== userId) {
      throw new ForbiddenException('You can only add entries to your own runs');
    }

    const entry = await this.prisma.entry.create({
      data: {
        ...createEntryDto,
        runId,
        userId,
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

    return entry;
  }

  async findAllByRun(runId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [entries, total] = await Promise.all([
      this.prisma.entry.findMany({
        where: { runId },
        skip,
        take: limit,
        orderBy: { dayNumber: 'asc' },
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
              comments: true,
            },
          },
        },
      }),
      this.prisma.entry.count({ where: { runId } }),
    ]);

    return {
      entries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const entry = await this.prisma.entry.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        run: {
          select: {
            id: true,
            title: true,
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    if (!entry) {
      throw new NotFoundException('Entry not found');
    }

    return entry;
  }

  async update(id: string, userId: string, updateEntryDto: UpdateEntryDto) {
    const entry = await this.prisma.entry.findUnique({
      where: { id },
    });

    if (!entry) {
      throw new NotFoundException('Entry not found');
    }

    if (entry.userId !== userId) {
      throw new ForbiddenException('You can only update your own entries');
    }

    return this.prisma.entry.update({
      where: { id },
      data: updateEntryDto,
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
    const entry = await this.prisma.entry.findUnique({
      where: { id },
    });

    if (!entry) {
      throw new NotFoundException('Entry not found');
    }

    if (entry.userId !== userId) {
      throw new ForbiddenException('You can only delete your own entries');
    }

    await this.prisma.entry.delete({
      where: { id },
    });

    return { message: 'Entry deleted successfully' };
  }
}
