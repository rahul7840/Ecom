import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CartDto } from './dto/cart.dto';
import { WishListDto } from './dto/wishList.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CartDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: dto.user_id },
    });

    if (!existingUser) {
      throw new BadRequestException(
        'User with the specified ID does not exist',
      );
    }

    const existingProduct = await this.prisma.product.findUnique({
      where: { id: dto.product_id },
    });

    if (!existingProduct) {
      throw new BadRequestException(
        'Product with the specified ID does not exist',
      );
    }

    // const existingCartItem = await this.prisma.cart.findFirst({
    //   where: {
    //     user_id: dto.user_id,
    //     product_id: dto.product_id,
    //   },
    // });

    // if (existingCartItem) {
    //   throw new BadRequestException('Cart item already exists');
    // }

    return await this.prisma.cart.create({
      data: {
        user_id: dto.user_id,
        product_id: dto.product_id,
        quantity: dto.quantity,
      },
    });
  }

  async findById(id: string) {
    const result = await this.prisma.cart.findUnique({
      where: {
        id,
      },
    });
    if (!result) {
      throw new BadRequestException('id is not found in database');
    }
    return result;
  }

  async findAllCart() {
    return await this.prisma.cart.findMany({});
  }

  //wishList

  async createWishList(dto: WishListDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: dto.user_id },
    });

    if (!existingUser) {
      throw new BadRequestException(
        'User with the specified ID does not exist',
      );
    }

    const existingProduct = await this.prisma.product.findUnique({
      where: { id: dto.product_id },
    });

    if (!existingProduct) {
      throw new BadRequestException(
        'Product with the specified ID does not exist',
      );
    }
    return await this.prisma.wishList.create({
      data: {
        user_id: dto.user_id,
        product_id: dto.product_id,
        wish_list: dto.wish_list,
      },
    });
  }

  async findBywishListId(id: string) {
    const result = await this.prisma.wishList.findUnique({
      where: {
        id,
      },
    });
    if (!result) {
      throw new BadRequestException('id is not found in database');
    }
    return result;
  }

  async findAllWishList() {
    const result = await this.prisma.wishList.findMany();
    return result;
  }
}
