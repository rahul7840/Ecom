import { Module } from '@nestjs/common';
import { UploadImagesService } from './upload_images.service';
import { UploadImagesController } from './upload_images.controller';
import { CloudinaryService } from './cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports:[MulterModule.register({
    dest:'./uploads'
  }),PrismaModule],
  controllers: [UploadImagesController],
  providers: [UploadImagesService,CloudinaryService],
})
export class UploadImagesModule {}
