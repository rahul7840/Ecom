import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';
@Module({
  imports: [PrismaModule,JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
