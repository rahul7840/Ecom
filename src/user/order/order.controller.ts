import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrderDTO } from "./dto/order.dto";
import { OrderSerrvice } from "./order.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Order')
@Controller()

export class OrderController{
    constructor(private readonly orderService:OrderSerrvice){}


    @Post('order')
    async add(@Body() dto:OrderDTO){
        return await this.orderService.create(dto)
    }

    @Get('initpayment/:orderNumber')
    async findAll(@Param('orderNumber') orderNumber:string){
        return await this.orderService.findOne(orderNumber)
    }
}