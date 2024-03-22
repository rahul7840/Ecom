import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
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
  @Post()
  async createUserAddress(@Body() dto: UserAddressDTO) {
    return this.paymentService.createUserAddress(dto);
  }

  @ApiTags('Address')
  @Delete(':userId')
  async deleteUserAddress(@Param('userId') userId: string) {
    return this.paymentService.deleteUserAddress(userId);
  }
}
