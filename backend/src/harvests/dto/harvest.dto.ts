import { IsString, IsOptional, IsNumber, IsDateString, IsInt, Min, Max, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHarvestDto {
  @ApiProperty()
  @IsDateString()
  harvestDate: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  wetWeight?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  trimMethod?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  harvestNotes?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  harvestImages?: string[];

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  dryingStartDate?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  dryingEndDate?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  dryingTemp?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  dryingHumidity?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  dryWeight?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  dryingNotes?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  curingStartDate?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  curingMethod?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  jarCount?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  burpingSchedule?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  curingHumidity?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  curingNotes?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  finalWeight?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  qualityRating?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  qualityNotes?: string;
}

export class UpdateHarvestDto {
  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  harvestDate?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  wetWeight?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  trimMethod?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  harvestNotes?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  harvestImages?: string[];

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  dryingStartDate?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  dryingEndDate?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  dryingTemp?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  dryingHumidity?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  dryWeight?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  dryingNotes?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  curingStartDate?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  curingMethod?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  jarCount?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  burpingSchedule?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  curingHumidity?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  curingNotes?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  finalWeight?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  qualityRating?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  qualityNotes?: string;
}
