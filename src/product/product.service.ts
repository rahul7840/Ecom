import { BadGatewayException, Injectable } from '@nestjs/common';
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

  async addproduct(dto: ProductDTO) {
    try {
      const newProduct = await this.prisma.product.create({
        data: {
          name: dto.name,
          description: dto.description,
          price: dto.price,
          quantity: dto.quantity,
          category: dto.category,
          image_url: dto.image_url,
          stock_status: dto.stock_status,
          weight: dto.weight,
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
          name: dto.name,
          description: dto.description,
          price: dto.price,
          quantity: dto.quantity,
          category: dto.category,
          image_url: dto.image_url,
          stock_status: dto.stock_status,
          weight: dto.weight,
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
}
