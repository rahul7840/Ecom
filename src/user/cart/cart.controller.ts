import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WishListDto } from './dto/wishList.dto';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiTags('Cart')
  @ApiOperation({ summary: 'Create a cart item' })
  @ApiResponse({ status: 201, description: 'Cart item created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('cart')
  async create(@Body() dto: CartDto) {
    return this.cartService.create(dto);
  }

  @ApiTags('Cart')
  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({ status: 200, description: 'Returns all cart items' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('cart/findall')
  async findAll() {
    return this.cartService.findAllCart();
  }

  @ApiTags('Cart')
  @ApiOperation({ summary: 'Find a cart item by ID' })
  @ApiResponse({ status: 200, description: 'Returns the cart item' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('cart/:id')
  async findById(@Param('id') id: string) {
    return this.cartService.findById(id);
  }

  // For wishList
  @ApiTags('Wish_List')
  @ApiOperation({ summary: 'Create a wish list item' })
  @ApiResponse({
    status: 201,
    description: 'Wish list item created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('wish_list')
  async createWishList(@Body() dto: WishListDto) {
    return this.cartService.createWishList(dto);
  }

  @ApiTags('Wish_List')
  @ApiOperation({ summary: 'Get all wish list items' })
  @ApiResponse({ status: 200, description: 'Returns all wish list items' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('wish_list/findall')
  async findAllWishList() {
    return this.cartService.findAllWishList();
  }

  @ApiTags('Wish_List')
  @ApiOperation({ summary: 'Find a wish list item by ID' })
  @ApiResponse({ status: 200, description: 'Returns the wish list item' })
  @ApiResponse({ status: 404, description: 'Wish list item not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('wish_list/:id')
  async findBywishListId(@Param('id') id: string) {
    return this.cartService.findBywishListId(id);
  }
}
