import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/addProduct.dto';

@ApiTags('Pruduct')
@Controller('Pruduct')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  @ApiOperation({
    summary: 'list-all product',
    description: 'list-all product.',
  })
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Post('add')
  @ApiResponse({
    status: 200,
    description: 'Successfully created.',
  })
  @ApiOperation({
    summary: 'create product',
    description: 'create product.',
  })
  async addProduct(@Body() dto: ProductDTO) {
    return await this.productService.addproduct(dto);
  }
  @Put('update/:id')
  @ApiResponse({
    status: 200,
    description: 'update created.',
  })
  @ApiOperation({
    summary: 'update product',
    description: 'update product.',
  })
  async updateProduct(@Param('id') id: string, @Body() dto: ProductDTO) {
    await this.productService.updateProduct(id, dto);
  }

  @Delete('delete/:id')
  @ApiResponse({
    status: 200,
    description: 'Delete created.',
  })
  @ApiOperation({
    summary: 'Delete product',
    description: 'Delete product.',
  })
  async deleteProduct(@Param('id') id: string) {
    await this.productService.deleteProduct(id);
  }
}
