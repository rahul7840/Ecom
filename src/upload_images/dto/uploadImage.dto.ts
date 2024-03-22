import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadImageDto {
  @ApiProperty({ format: 'binary', description: 'Image file' })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public images: string[];
}
