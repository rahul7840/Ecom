import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderDTO {
  

  @ApiProperty({ format: 'uuid' })
  userId?: string;

  @ApiProperty()
  @IsOptional()
  orderStatus?: string;

  @ApiProperty()
  @IsOptional()
  trackingId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  estDeliverDate?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  actDeliverDate?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  trackingStatus?: string;

  @ApiProperty()
  @IsOptional()
  gstin?: string;

  @ApiProperty()
  @IsNotEmpty()
  totalAmount: string;

  @ApiProperty()
  @IsNotEmpty()
  deliveryDetail: string;

  @ApiProperty()
  @IsNotEmpty()
  currency: string;

  @ApiProperty()
  @IsOptional()
  shippingCost?: string;

  @ApiProperty()
  @IsOptional()
  otherCost?: string;

  @ApiProperty()
  @IsOptional()
  billToAddressId?: string;

  @ApiProperty()
  @IsOptional()
  shipToAddressId?: string;
}
