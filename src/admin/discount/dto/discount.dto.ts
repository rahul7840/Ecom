import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
  IsInt,
  IsDateString,
} from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty()
  @IsNotEmpty()
  discountPrice: string;

  @ApiProperty()
  @IsNotEmpty()
  discountPerc: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rule: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  expireDay: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  condition: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  expireDate: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  couponCode?: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  product_id: string;
}
