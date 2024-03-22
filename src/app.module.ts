import { Module } from '@nestjs/common';
import { ProductModule } from './user/product/product.module';
import { PrismaModule } from 'prisma/prisma.module';
import { DiscountModule } from './admin/discount/discount.module';
import { AuthModule } from './admin/auth/auth.module';
import { ReviewModule } from './user/review/review.module';
import { UploadImagesModule } from './upload_images/upload_images.module';
@Module({
  imports: [
    ProductModule,
    PrismaModule,
    DiscountModule,
    AuthModule,
    ReviewModule,
    UploadImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
