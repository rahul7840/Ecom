import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaModule } from 'prisma/prisma.module';
import { ProductController } from './product.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
