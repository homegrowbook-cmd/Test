import { IsString, IsOptional, IsBoolean, IsEnum, IsInt, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GrowPhase } from '@prisma/client';

export class CreateRunDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  strainName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  strainType?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  lightType?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  lightWatts?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  medium?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nutrients?: string;

  @ApiProperty({ required: false, enum: GrowPhase })
  @IsEnum(GrowPhase)
  @IsOptional()
  phase?: GrowPhase;
}

export class UpdateRunDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  strainName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  strainType?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  lightType?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  lightWatts?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  medium?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nutrients?: string;

  @ApiProperty({ required: false, enum: GrowPhase })
  @IsEnum(GrowPhase)
  @IsOptional()
  phase?: GrowPhase;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}
