import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadImageDto } from './dto/uploadImage.dto';
import { UploadVideoDto } from './dto/uploadVideo.dto';

@ApiTags('Upload_Images')
@Controller('upload')
export class UploadImagesController {
  constructor(
    private readonly CloudinaryService:CloudinaryService) {}

    @Post('images')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', 10)) // Adjust the limit as needed
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Body() dto: UploadImageDto) {
    try {
      const filePaths = files.map((file) => file.path);
      const uploadResults = await this.CloudinaryService.uploadImages(filePaths);
      return uploadResults;
    } catch (error) {
      console.error("Error uploading images ", error);
      throw new Error("Failed to upload images");
    }
  }
    @Post('video')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('video'))
    async uploadVideo(@UploadedFile() file: Express.Multer.File,@Body() dto:UploadVideoDto){
        try{
            const result = await this.CloudinaryService.uploadVideo(file.path);
            return result
        }catch(error){
            console.error("error uploading image ",error)
            throw new error("failed to upload image")
        }
    }

    
}
