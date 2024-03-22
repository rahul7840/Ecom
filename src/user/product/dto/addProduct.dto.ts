import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsObject,
} from 'class-validator';

export class ProductDTO {
  @ApiProperty({
    example: 'Product Name',
    description: 'The title of the product.',
  })
  @IsString()
  productTitle: string;

  @ApiProperty({
    example: 'Product Version',
    description: 'The version of the product.',
  })
  @IsString()
  productVersion: string;

  @ApiProperty({
    example: 'Product Description',
    description: 'The description of the product.',
  })
  @IsString()
  productDescription: string;

  @ApiProperty({
    example: ['https://image1.jpg', 'https://image2.jpg'],
    description: 'Array of image URLs of the product.',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({
    example: 'SKU123',
    description: 'The SKU code of the product.',
  })
  @IsString()
  skuCode: string;

  @ApiProperty({
    example: 'HSN123',
    description: 'The HSN code of the product.',
  })
  @IsString()
  hsnCode: string;

  @ApiProperty({
    example: 'BarCode123',
    description: 'The barcode of the product.',
  })
  @IsString()
  barCode: string;

  @ApiProperty({
    example: '10',
    description: 'The stock quantity of the product.',
  })
  @IsString()
  stock: string;

  @ApiProperty({
    example: 10.99,
    description: 'The price of the product without GST.',
  })
  @IsNumber()
  priceWithoutGst: number;

  @ApiProperty({
    example: 18.5,
    description: 'The GST percentage applied to the product.',
  })
  @IsNumber()
  gst: number;

  @ApiProperty({
    example: { key: 'value' },
    description: 'Specifications of the product.',
    type: Object,
  })
  @IsObject()
  specification: Record<string, any>;

  @ApiProperty({
    example: { key: 'value' },
    description: 'Overview of the product.',
    type: Object,
  })
  @IsObject()
  overview: Record<string, any>;

  @ApiProperty({
    example: { key: 'value' },
    description: 'Primary image details of the product.',
    type: Object,
  })
  @IsObject()
  primaryImage: Record<string, any>;

  @ApiProperty({
    example: '10',
    description: 'The quantity of the product.',
  })
  @IsString()
  qty: string;

  @ApiProperty({
    example: '4.5',
    description: 'The rating of the product.',
  })
  @IsOptional()
  @IsString()
  rating?: string;

  // Assuming Discount and Review are defined somewhere else as DTOs
}
