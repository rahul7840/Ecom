import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDTO } from './dto/payment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserAddressDTO } from './dto/address.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiTags('Payment')
  @ApiOperation({ summary: 'Create a payment' })
  @ApiResponse({ status: 201, description: 'Payment created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('payment')
  async create(@Body() dto: PaymentDTO) {
    return await this.paymentService.create(dto);
  }

  @ApiTags('Address')
  @ApiOperation({ summary: 'Create user address' })
  @ApiResponse({
    status: 201,
    description: 'User address created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('address')
  async createUserAddress(@Body() dto: UserAddressDTO) {
    return this.paymentService.createUserAddress(dto);
  }

  @ApiTags('Address')
  @ApiOperation({ summary: 'Delete user address' })
  @ApiResponse({
    status: 200,
    description: 'User address deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'User address not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 404, description: 'User address not found' })
  @Delete(':userId')
  async deleteUserAddress(@Param('userId') userId: string) {
    return this.paymentService.deleteUserAddress(userId);
  }
}
