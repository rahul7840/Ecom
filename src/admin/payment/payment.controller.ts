import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDTO } from './dto/payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserAddressDTO } from './dto/address.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @ApiTags('Payment')
  @Post('payment')
  async create(@Body() dto: PaymentDTO) {
    return await this.paymentService.create(dto);
  }

  @ApiTags('Address')
  @Get('address')
  async findAll() {
    return this.paymentService.findall();
  }
  @ApiTags('Address')
  @Post('address')
  async createUserAddress(@Body() dto: UserAddressDTO) {
    return this.paymentService.createUserAddress(dto);
  }

  @ApiTags('Address')
  @Delete('address/:userId')
  async deleteUserAddress(@Param('userId') userId: string) {
    return this.paymentService.deleteUserAddress(userId);
  }
}
