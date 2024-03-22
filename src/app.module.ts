import { Module } from '@nestjs/common';
import { ProductModule } from './user/product/product.module';
import { PrismaModule } from 'prisma/prisma.module';
import { DiscountModule } from './admin/discount/discount.module';
import { AuthModule } from './admin/auth/auth.module';
import { ReviewModule } from './user/review/review.module';
import { UploadImagesModule } from './upload_images/upload_images.module';
import { OrderModule } from './user/order/order.module';
import { PaymentModule } from './admin/payment/payment.module';
@Module({
  imports: [
    ProductModule,
    PrismaModule,
    DiscountModule,
    AuthModule,
    ReviewModule,
    UploadImagesModule,
    OrderModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
