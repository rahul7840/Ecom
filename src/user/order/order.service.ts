import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { OrderDTO } from './dto/order.dto';
import { OrderItemDto } from './dto/order_item.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: OrderDTO) {
    const { userId, billToAddressId, shipToAddressId } = dto;
    const orderNumber = await this.generateUniqueOrderNumber();
    const findUserId = await this.prisma.user.findFirst({
      where: { id: userId },
    });
    if (!findUserId) {
      throw new BadRequestException('does not find user id ');
    }
    const findUserAddress = await this.prisma.userAddress.findFirst({
      where: {
        OR: [{ id: billToAddressId }, { id: shipToAddressId }],
      },
    });
    if (!findUserAddress) {
      throw new BadRequestException('does not find user address ');
    }
    const orderDetails = await this.prisma.order.create({
      data: {
        orderNumber: orderNumber,
        userId: dto.userId,
        orderStatus: dto.orderStatus,
        trackingId: dto.trackingId,
        estDeliverDate: dto.estDeliverDate,
        actDeliverDate: dto.actDeliverDate,
        trackingStatus: dto.trackingStatus,
        gstin: dto.gstin,
        totalAmount: dto.totalAmount,
        deliveryDetail: dto.deliveryDetail,
        currency: dto.currency,
        shippingCost: dto.shippingCost,
        otherCost: dto.otherCost,
        billToAddressId: dto.billToAddressId,
        shipToAddressId: dto.shipToAddressId,
      },
      include: {
        payment: true,
      },
    });

    return {
      id: orderDetails?.id,
      orderNumber: orderDetails?.orderNumber,
      userId: orderDetails?.userId,
      tottal_amount: orderDetails?.payment.map((item) => item.total_amount),
      currency_type: orderDetails?.payment.map((item) => item.currency_type),
      razorpay_order_id: orderDetails?.payment.map(
        (item) => item.razorpay_order_id,
      ),
      razorpay_payment_id: orderDetails?.payment.map(
        (item) => item.razorpay_payment_id,
      ),
      razorpay_sgnature: orderDetails?.payment.map(
        (item) => item.razorpay_sgnature,
      ),
      reason: orderDetails?.payment.map((item) => item.reason),
      attempt: orderDetails?.payment.map((item) => item.attempt),
      status: orderDetails?.payment.map((item) => item.status),
      payment_date: orderDetails?.payment.map((item) => item.payment_date),
      payment_id: orderDetails?.payment.map((item) => item.payment_id),
      payment_method: orderDetails?.payment.map((item) => item.payment_method),
      payment_meta: orderDetails?.payment.map((item) => item.payment_meta),
      payment_note: orderDetails?.payment.map((item) => item.payment_note),
    };
  }

  async findAll() {
    return await this.prisma.order.findMany();
  }
  // async findAll() {
  //     const orderDetails = await this.prisma.order.findMany({
  //         include: {
  //             payment: true
  //         }
  //     });

  //     if (!orderDetails) {
  //         return null;
  //     }

  //     return {
  //         id: orderDetails.id,
  //         userId: orderDetails.userId,
  //         total_amount: orderDetails.payment.map((item) => item.total_amount),
  //         currency_type: orderDetails.payment.map((item) => item.currency_type),
  //         razorpay_order_id: orderDetails.payment.map((item) => item.razorpay_order_id),
  //         razorpay_payment_id: orderDetails.payment.map((item) => item.razorpay_payment_id),
  //         razorpay_signature: orderDetails.payment.map((item) => item.razorpay_sgnature),
  //         reason: orderDetails.payment.map((item) => item.reason),
  //         attempt: orderDetails.payment.map((item) => item.attempt),
  //         status: orderDetails.payment.map((item) => item.status),
  //         payment_date: orderDetails.payment.map((item) => item.payment_date),
  //         payment_id: orderDetails.payment.map((item) => item.payment_id),
  //         payment_method: orderDetails.payment.map((item) => item.payment_method),
  //         payment_meta: orderDetails.payment.map((item) => item.payment_meta),
  //         payment_note: orderDetails.payment.map((item) => item.payment_note),
  //     };
  // }

  async findOne(orderNumber: string) {
    const orderDetails = await this.prisma.order.findFirst({
      where: { orderNumber },
      include: {
        payment: true,
      },
    });

    if (!orderDetails) {
      throw new BadRequestException('Invalid order number');
    }

    return {
      id: orderDetails.id,
      userId: orderDetails.userId,
      total_amount: orderDetails.payment.map((item) => item.total_amount),
      currency_type: orderDetails.payment.map((item) => item.currency_type),
      razorpay_order_id: orderDetails.payment.map(
        (item) => item.razorpay_order_id,
      ),
      razorpay_payment_id: orderDetails.payment.map(
        (item) => item.razorpay_payment_id,
      ),
      razorpay_signature: orderDetails.payment.map(
        (item) => item.razorpay_sgnature,
      ),
      reason: orderDetails.payment.map((item) => item.reason),
      attempt: orderDetails.payment.map((item) => item.attempt),
      status: orderDetails.payment.map((item) => item.status),
      payment_date: orderDetails.payment.map((item) => item.payment_date),
      payment_id: orderDetails.payment.map((item) => item.payment_id),
      payment_method: orderDetails.payment.map((item) => item.payment_method),
      payment_meta: orderDetails.payment.map((item) => item.payment_meta),
      payment_note: orderDetails.payment.map((item) => item.payment_note),
    };
  }

  // for orderItem

  async orderItemCreate(dto: OrderItemDto) {
    const { orderId, productID } = dto;
    const userOrder = await this.prisma.order.findFirst({
      where: { id: orderId },
    });
    if (!userOrder) {
      throw new BadRequestException('order is not found');
    }
    const userProduct = await this.prisma.product.findFirst({
      where: { id: productID },
    });
    if (!userProduct) {
      throw new BadRequestException('product is not found');
    }
    return await this.prisma.orderItem.create({
      data: {
        orderId: dto.orderId,
        productId: dto.productID,
        quantity: dto.quantity,
        price: dto.price,
      },
    });
  }
  async findOrderItem(id: string) {
    return await this.prisma.orderItem.findFirst({
      where: {
        OR: [{ orderId: id }, { productId: id }],
      },
    });
  }

  private async generateUniqueOrderNumber(): Promise<string> {
    const timestamp = Date.now().toString(36); // Convert timestamp to base36 string
    const randomString = Math.random().toString(36).substr(2, 8); // Random component
    const orderNumber = timestamp + randomString;
    return orderNumber;
  }
}
