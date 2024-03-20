import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, isArray } from 'class-validator';
import { isatty } from 'tty';

export class UploadImageDto {

@ApiProperty({ format: 'binary', description: 'Image file' })
  @IsNotEmpty()
  @IsString()
  @IsArray()
  @IsOptional()
  public images: string[];
}