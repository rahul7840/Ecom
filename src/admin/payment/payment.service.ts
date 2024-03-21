import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { PaymentDTO } from "./dto/payment.dto";
import { UserAddressDTO } from "./dto/address.dto";

@Injectable()
export class PaymentService{
    constructor(private readonly prisma:PrismaService){}

    async create(dto:PaymentDTO){
        return await this.prisma.payment.create({
            data:{
                userId:dto.userId,
                total_amount:dto.total_amount,
                orderId:dto.orderId,
                currency_type:dto.currency_type,
                razorpay_order_id:dto.razorpay_order_id,
                razorpay_payment_id:dto.razorpay_payment_id,
                razorpay_sgnature:dto.razorpay_sgnature,
                reason:dto.reason,
                attempt:dto.attempt,
                status:dto.status,
                payment_date:new Date(),
                payment_meta:dto.payment_meta,
                payment_id:dto.payment_id,
                payment_note:dto.payment_note,
                payment_method:dto.payment_method

            }
        })
    }

// for addresss of users
    async createUserAddress(dto: UserAddressDTO) {
        try {
          return await this.prisma.userAddress.create({
            data: {
              userId: dto.userId,
              house_no: dto.house_no,
              street: dto.street,
              city: dto.city,
              state: dto.state,
              country: dto.country,
              pincode: dto.pincode,
              landmark: dto.landmark,
              isDefult: dto.isDefault ?? true, // Defaulting to true if not provided
            },
          });
        } catch (error) {
          throw new Error('Unable to create user address'); // Handle error appropriately
        }
      }
   
      async deleteUserAddress(userId: string) {
        try {
          const userAddress = await this.prisma.userAddress.findFirst({
            where: { userId },
          });
          if (!userAddress) {
            throw new NotFoundException('User address not found');
          }
          return await this.prisma.userAddress.deleteMany({
            where: { userId },
          });
        } catch (error) {
          throw new Error('Unable to delete user address'); // Handle error appropriately
        }
      }
}