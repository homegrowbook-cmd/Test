import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateHarvestDto, UpdateHarvestDto } from './dto/harvest.dto';

@Injectable()
export class HarvestsService {
  constructor(private prisma: PrismaService) {}

  async create(runId: string, userId: string, createHarvestDto: CreateHarvestDto) {
    // Check if run exists and belongs to user
    const run = await this.prisma.run.findUnique({
      where: { id: runId },
    });

    if (!run) {
      throw new NotFoundException(`Run with ID ${runId} not found`);
    }

    if (run.userId !== userId) {
      throw new ForbiddenException('You can only add harvest data to your own runs');
    }

    // Check if harvest already exists for this run
    const existingHarvest = await this.prisma.harvest.findUnique({
      where: { runId },
    });

    if (existingHarvest) {
      throw new ForbiddenException('Harvest data already exists for this run. Use update instead.');
    }

    // Calculate metrics if we have the necessary data
    const yieldPerWatt = this.calculateYieldPerWatt(
      createHarvestDto.finalWeight || createHarvestDto.dryWeight,
      run.lightWatts,
    );

    const yieldPerDay = this.calculateYieldPerDay(
      createHarvestDto.finalWeight || createHarvestDto.dryWeight,
      run.startDate,
      new Date(createHarvestDto.harvestDate),
    );

    const harvest = await this.prisma.harvest.create({
      data: {
        ...createHarvestDto,
        yieldPerWatt,
        yieldPerDay,
        run: {
          connect: { id: runId },
        },
      },
    });

    return harvest;
  }

  async findByRunId(runId: string) {
    const harvest = await this.prisma.harvest.findUnique({
      where: { runId },
      include: {
        run: {
          select: {
            id: true,
            title: true,
            strainName: true,
            lightWatts: true,
            startDate: true,
          },
        },
      },
    });

    return harvest;
  }

  async update(runId: string, userId: string, updateHarvestDto: UpdateHarvestDto) {
    // Check if harvest exists
    const harvest = await this.prisma.harvest.findUnique({
      where: { runId },
      include: {
        run: true,
      },
    });

    if (!harvest) {
      throw new NotFoundException(`Harvest data not found for run ${runId}`);
    }

    if (harvest.run.userId !== userId) {
      throw new ForbiddenException('You can only update harvest data for your own runs');
    }

    // Recalculate metrics if relevant fields changed
    const finalWeight = updateHarvestDto.finalWeight !== undefined
      ? updateHarvestDto.finalWeight
      : (harvest.finalWeight || harvest.dryWeight);

    const yieldPerWatt = this.calculateYieldPerWatt(
      finalWeight,
      harvest.run.lightWatts,
    );

    const harvestDate = updateHarvestDto.harvestDate
      ? new Date(updateHarvestDto.harvestDate)
      : harvest.harvestDate;

    const yieldPerDay = this.calculateYieldPerDay(
      finalWeight,
      harvest.run.startDate,
      harvestDate,
    );

    const updatedHarvest = await this.prisma.harvest.update({
      where: { runId },
      data: {
        ...updateHarvestDto,
        yieldPerWatt,
        yieldPerDay,
      },
    });

    return updatedHarvest;
  }

  async delete(runId: string, userId: string) {
    const harvest = await this.prisma.harvest.findUnique({
      where: { runId },
      include: {
        run: true,
      },
    });

    if (!harvest) {
      throw new NotFoundException(`Harvest data not found for run ${runId}`);
    }

    if (harvest.run.userId !== userId) {
      throw new ForbiddenException('You can only delete harvest data for your own runs');
    }

    await this.prisma.harvest.delete({
      where: { runId },
    });

    return { message: 'Harvest data deleted successfully' };
  }

  // Helper methods for calculations
  private calculateYieldPerWatt(weight: number | null | undefined, watts: number | null | undefined): number | null {
    if (!weight || !watts || watts === 0) {
      return null;
    }
    return Number((weight / watts).toFixed(2));
  }

  private calculateYieldPerDay(
    weight: number | null | undefined,
    startDate: Date,
    harvestDate: Date,
  ): number | null {
    if (!weight) {
      return null;
    }

    const days = Math.ceil((harvestDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) {
      return null;
    }

    return Number((weight / days).toFixed(2));
  }
}
