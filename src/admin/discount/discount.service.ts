// discount.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateDiscountDto } from './dto/discount.dto';

@Injectable()
export class DiscountService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateDiscountDto) {
    let expirationDate: Date;

    if (data.expireDay) {
      const today = new Date();
      expirationDate = new Date(
        today.getTime() + data.expireDay * 24 * 60 * 60 * 1000,
      );
    } else {
      expirationDate = new Date(data.expireDate);
    }

    const today = new Date();
    const expireDayLeft = Math.max(
      data.expireDay ? data.expireDay : 0,
      Math.ceil(
        (expirationDate.getTime() - today.getTime()) / (1000 * 3600 * 24),
      ),
    );

    const discount = await this.prisma.discount.create({
      data: {
        discountPerc: data.discountPerc,
        discountPrice: data.discountPrice,
        rule: data.rule,
        expireDate: expirationDate,
        expireDay: expireDayLeft,
        product_id: data.product_id,
        condition: data.condition,
        couponCode: data.couponCode,
      },
    });

    const expireTimeLeft = expirationDate.getTime() - today.getTime();

    return {
      ...discount,
      expireDayLeft,
      expireTimeLeft,
    };
  }

  async getAll() {
    const discounts = await this.prisma.discount.findMany();

    const today = new Date();
    const discountsWithTimeLeft = discounts.map((discount) => {
      const expirationDate = new Date(discount.expireDate);
      const expireDayLeft = Math.max(
        discount.expireDay,
        Math.ceil(
          (expirationDate.getTime() - today.getTime()) / (1000 * 3600 * 24),
        ),
      );
      const expireTimeLeft = expirationDate.getTime() - today.getTime();

      return {
        ...discount,
        expireDayLeft,
        expireTimeLeft,
      };
    });

    return discountsWithTimeLeft;
  }
}
