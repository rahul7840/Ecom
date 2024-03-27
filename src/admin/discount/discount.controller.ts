import { Controller, Post, Body, Get } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/discount.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Admin-Discount')
@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new discount' })
  @ApiResponse({ status: 201, description: 'Discount created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() dto: CreateDiscountDto) {
    return this.discountService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all discounts' })
  @ApiResponse({ status: 200, description: 'Returns all discounts' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAll() {
    return await this.discountService.getAll();
  }
}
