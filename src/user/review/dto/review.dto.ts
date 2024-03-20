// create-review.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsArray } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  @ApiProperty()
  productId: string;

  @IsString()
  @ApiProperty()
  comment: string;

  @ApiProperty()
  @IsString()
  rating: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsArray()
  images: string[];
}
