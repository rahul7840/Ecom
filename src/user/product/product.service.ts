import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ProductDTO } from './dto/addProduct.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProducts() {
    try {
      const allProducts = await this.prisma.product.findMany();
      return allProducts;
    } catch (e) {
      console.log('error', e);
    }
  }

  async getbyIdProducts(id: string) {
    try {
      const findProduct = await this.prisma.product.findFirst({
        where: { id },
      });
      if (!findProduct)
        throw new BadRequestException('product does not exist with this id');

      return findProduct;
    } catch (e) {
      console.log('error', e);
    }
  }
  async addproduct(dto: ProductDTO) {
    try {
      const newProduct = await this.prisma.product.create({
        data: {
          productTitle: dto.productTitle,
          productVersion: dto.productVersion,
          productDescription: dto.productDescription,
          images: dto.images,
          skuCode: dto.skuCode,
          hsnCode: dto.hsnCode,
          barCode: dto.barCode,
          stock: dto.stock,
          priceWithoutGst: dto.priceWithoutGst,
          gst: dto.gst,
          specification: dto.specification,
          overview: dto.overview,
          primaryImage: dto.primaryImage,
          qty: dto.qty,
          rating: dto.rating,
        },
      });
      console.log(newProduct);
      return { message: 'Product added successfully' };
    } catch (e) {
      console.log('error', e);
    }
  }

  async updateProduct(id: string, dto: ProductDTO) {
    try {
      const check = await this.prisma.product.findFirst({
        where: { id },
      });
      if (!check) throw new BadGatewayException('Product not found');
      const updatedProduct = await this.prisma.product.update({
        where: { id: id },
        data: {
          productTitle: dto.productTitle,
          productVersion: dto.productVersion,
          productDescription: dto.productDescription,
          images: dto.images,
          skuCode: dto.skuCode,
          hsnCode: dto.hsnCode,
          barCode: dto.barCode,
          stock: dto.stock,
          priceWithoutGst: dto.priceWithoutGst,
          gst: dto.gst,
          specification: dto.specification,
          overview: dto.overview,
          primaryImage: dto.primaryImage,
          qty: dto.qty,
          rating: dto.rating,
        },
      });
      console.log(updatedProduct);
      return { message: 'updated successfully' };
    } catch (e) {
      console.log('error', e);
    }
  }

  async deleteProduct(id: string) {
    try {
      const check = await this.prisma.product.findFirst({
        where: { id },
      });
      if (!check) throw new BadGatewayException('product not exist');

      const deletedProduct = await this.prisma.product.delete({
        where: { id: id },
      });
      console.log(deletedProduct);
      return { message: 'deleted successfully' };
    } catch (e) {
      console.log('error', e);
    }
  }

  // async getCartItems() {
  //   return await this.prisma.product.findMany({
  //     where: { add_to_cart: true },
  //   });
  // }

  // async addItemToCart(id: string) {
  //   const productExists = await this.prisma.product.findUnique({
  //     where: { id },
  //   });
  //   if (!productExists) {
  //     throw new BadRequestException('Product not found');
  //   }

  //   await this.prisma.product.update({
  //     where: { id },
  //     data: { add_to_cart: true },
  //   });

  //   return { message: 'Product added to cart successfully' };
  // }

  // async removeItemFromCart(id: string) {
  //   const productExists = await this.prisma.product.findUnique({
  //     where: { id },
  //   });
  //   if (!productExists) {
  //     throw new BadRequestException('Product not found');
  //   }

  //   // await this.prisma.product.update({
  //   //   where: { id },
  //   //   data: { add_to_cart: false },
  //   // });

  //   return { message: 'Product removed from cart successfully' };
  // }

  // async getWishlistItems() {
  //   return await this.prisma.product.findMany({
  //     where: { wish_list: true },
  //   });
  // }

  // async addItemToWishlist(id: string) {
  //   const productExists = await this.prisma.product.findUnique({
  //     where: { id },
  //   });
  //   if (!productExists) {
  //     throw new BadRequestException('Product not found');
  //   }

  //   await this.prisma.product.update({
  //     where: { id },
  //     data: { wish_list: true },
  //   });

  //   return { message: 'Product added to wishlist successfully' };
  // }

  // async removeItemFromWishlist(id: string) {
  //   const productExists = await this.prisma.product.findUnique({
  //     where: { id },
  //   });
  //   if (!productExists) {
  //     throw new BadRequestException('Product not found');
  //   }

  //   await this.prisma.product.update({
  //     where: { id },
  //     data: { wish_list: false },
  //   });

  //   return { message: 'Product removed from wishlist successfully' };
  // }
}
