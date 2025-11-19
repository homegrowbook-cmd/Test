import { IsString, IsOptional, IsInt, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEntryDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty()
  @IsInt()
  dayNumber: number;

  @ApiProperty()
  @IsInt()
  weekNumber: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  temperature?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  humidity?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  vpd?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  ec?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  ph?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  ppfd?: number;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  images?: string[];
}

export class UpdateEntryDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  dayNumber?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  weekNumber?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  temperature?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  humidity?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  vpd?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  ec?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  ph?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  ppfd?: number;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  images?: string[];
}
