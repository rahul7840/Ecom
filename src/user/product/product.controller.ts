import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/addProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  @ApiOperation({
    summary: 'list-all product',
    description: 'list-all product.',
  })
  @ApiTags('Product')
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'list-all product',
    description: 'list-all product.',
  })
  @ApiTags('Product')
  async getbYProducts(@Param('id') id: string) {
    return await this.productService.getbyIdProducts(id);
  }

  @Post('')
  @ApiResponse({
    status: 200,
    description: 'Successfully created.',
  })
  @ApiOperation({
    summary: 'create product',
    description: 'create product.',
  })
  @ApiTags('Product')
  async addProduct(@Body() dto: ProductDTO) {
    return await this.productService.addproduct(dto);
  }
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'update created.',
  })
  @ApiOperation({
    summary: 'update product',
    description: 'update product.',
  })
  @ApiTags('Product')
  async updateProduct(@Param('id') id: string, @Body() dto: ProductDTO) {
    await this.productService.updateProduct(id, dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete created.',
  })
  @ApiOperation({
    summary: 'Delete product',
    description: 'Delete product.',
  })
  @ApiTags('Product')
  async deleteProduct(@Param('id') id: string) {
    await this.productService.deleteProduct(id);
  }

  //add to cart

  // @ApiOperation({
  //   summary: 'findAll product in cart',
  //   description: 'findAll product in cart',
  // })
  // @ApiTags('Cart')
  // @Get('cart')
  // async getCartItems() {
  //   return await this.productService.getCartItems();
  // }
  // @ApiOperation({
  //   summary: 'add product to cart',
  //   description: 'add product to cart',
  // })
  // @ApiTags('Cart')
  // @Post('cart/:id')
  // async addItemToCart(@Param('id') id: string) {
  //   return await this.productService.addItemToCart(id);
  // }

  // @ApiOperation({
  //   summary: 'remove product to cart',
  //   description: 'remove product to cart',
  // })
  // @ApiTags('Cart')
  // @Delete('cart/:id')
  // async removeItemFromCart(@Param('id') id: string) {
  //   return await this.productService.removeItemFromCart(id);
  // }

  //Wishlist

  // @ApiOperation({
  //   summary: 'findAll product in wishlist',
  //   description: 'findAll product in wishlist',
  // })
  // @ApiTags('Wish-list Operations')
  // @Get('wishlist')
  // async getWishlistItems() {
  //   return await this.productService.getWishlistItems();
  // }

  // @ApiOperation({
  //   summary: 'add product to wishlist',
  //   description: 'add product to wishlist',
  // })
  // @ApiTags('Wish-list Operations')
  // @Post('wishlist/:id')
  // async addItemToWishlist(@Param('id') id: string) {
  //   return await this.productService.addItemToWishlist(id);
  // }

  // @ApiOperation({
  //   summary: 'remove product to wishlist',
  //   description: 'remove product to wishlist',
  // })
  // @ApiTags('Wish-list Operations')
  // @Delete('wishlist/:id')
  // async removeItemFromWishlist(@Param('id') id: string) {
  //   return await this.productService.removeItemFromWishlist(id);
  // }
  //test push
}
