import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class PaymentDTO {
   
  
    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    userId: string;
  
    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    orderId: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    total_amount: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    currency_type: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    razorpay_order_id?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    razorpay_payment_id?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    razorpay_sgnature?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    reason?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    attempt?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    status?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsDateString()
    payment_date?: Date;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    payment_method: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    payment_id?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    payment_note?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    payment_meta?: string;

   
  }