import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { OrderSerrvice } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { OrderItemDto } from './dto/order_item.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderSerrvice) {}

  @ApiTags('Order')
  @Post('order')
  async add(@Body() dto: OrderDTO) {
    return await this.orderService.create(dto);
  }

  @ApiTags('Order')
  @Get('initpayment/:orderNumber')
  async findOne(@Param('orderNumber') orderNumber: string) {
    return await this.orderService.findOne(orderNumber);
  }

  @ApiTags('Order')
  @Get('order')
  async findAll() {
    return await this.orderService.findAll();
  }

  @ApiTags('Order Item')
  @Post('orderitem')
  async orderItem(@Body() dto: OrderItemDto) {
    return await this.orderService.orderItemCreate(dto);
  }

  @ApiTags('Order Item')
  @Get(':id')
  async findOrderItem(@Param('id') id: string) {
    return await this.orderService.findOrderItem(id);
  }
}
