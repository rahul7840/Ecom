import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { OrderController } from './order.controller';
import { OrderSerrvice } from './order.service';

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [OrderSerrvice],
})
export class OrderModule {}
