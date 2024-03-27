import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { OrderService } from './order.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderItemDto } from './dto/order_item.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiTags('Order')
  @ApiOperation({ summary: 'Create an order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('order')
  async add(@Body() dto: OrderDTO) {
    return await this.orderService.create(dto);
  }

  @ApiTags('Order')
  @ApiOperation({ summary: 'Find an order by order number' })
  @ApiResponse({ status: 200, description: 'Returns the order' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('initpayment/:orderNumber')
  async findOne(@Param('orderNumber') orderNumber: string) {
    return await this.orderService.findOne(orderNumber);
  }

  @ApiTags('Order')
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Returns all orders' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('order')
  async findAll() {
    return await this.orderService.findAll();
  }

  @ApiTags('Order Item')
  @ApiOperation({ summary: 'Create an order item' })
  @ApiResponse({ status: 201, description: 'Order item created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('orderitem')
  async orderItem(@Body() dto: OrderItemDto) {
    return await this.orderService.orderItemCreate(dto);
  }

  @ApiTags('Order Item')
  @ApiOperation({ summary: 'Find an order item by ID' })
  @ApiResponse({ status: 200, description: 'Returns the order item' })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get(':id')
  async findOrderItem(@Param('id') id: string) {
    return await this.orderService.findOrderItem(id);
  }
}
