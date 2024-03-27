import { Module, ValidationPipe } from '@nestjs/common';
import { ProductModule } from './user/product/product.module';
import { PrismaModule } from 'prisma/prisma.module';
import { DiscountModule } from './admin/discount/discount.module';
import { AuthModule } from './admin/auth/auth.module';
import { ReviewModule } from './user/review/review.module';
import { UploadImagesModule } from './upload_images/upload_images.module';
import { OrderModule } from './user/order/order.module';
import { PaymentModule } from './admin/payment/payment.module';
import { TransformInterceptor } from './admin/libs/common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './admin/libs/common/filter/all.exception.filter';
import { HttpExceptionFilter } from './admin/libs/common/filter/http.exception.filter';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CartModule } from './user/cart/cart.module';
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
    CartModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
