import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CartDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  quantity: string;

  @ApiProperty({
    required: false,
  })
  @IsUUID(undefined, { each: true })
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsUUID(undefined, { each: true })
  @IsString()
  product_id: string;
}
