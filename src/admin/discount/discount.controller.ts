// discount.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/discount.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin-Discount')
@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  async create(@Body() dto: CreateDiscountDto) {
    return this.discountService.create(dto);
  }

  @Get()
  async getAll() {
    return await this.discountService.getAll();
  }
}
