import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadVideoDto {
    
@ApiProperty({ format: 'binary', description: 'Image file' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public video: string;
}