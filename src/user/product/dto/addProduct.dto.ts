// product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class ProductDTO {
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Product description.',
    description: 'The description of the product.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 10.99,
    description: 'The price of the product.',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 100,
    description: 'The quantity of the product in stock.',
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 'Electronics',
    description: 'The category of the product.',
  })
  @IsString()
  category: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/dffvzezv8/image/upload/v1710939189/uploads/w20vuu3xtv3xydakzevl.jpg',
    description: 'The URL of the product image.',
  })
  @IsString()
  image_url: string;

  @ApiProperty({
    example: true,
    description: 'The stock status of the product.',
  })
  @IsBoolean()
  stock_status: boolean;

  @ApiProperty({
    example: 5.2,
    description: 'The weight of the product.',
  })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({
    example: 4.5,
    description: 'The rating of the product.',
  })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({
    example: 'xyz11@gmail.com',
    description: 'The email address of the user.',
  })
  @IsNotEmpty({ message: 'email cannot be empty' })
  email: string;
}
