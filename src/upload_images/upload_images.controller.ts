import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { UploadImageDto } from './dto/uploadImage.dto';
import { UploadVideoDto } from './dto/uploadVideo.dto';

@ApiTags('Upload_Images')
@Controller('upload')
export class UploadImagesController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('images')
  @ApiOperation({ summary: 'Upload multiple images' })
  @ApiResponse({ status: 201, description: 'Images uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', 10)) // Adjust the limit as needed
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() dto: UploadImageDto,
  ) {
    try {
      const filePaths = files.map((file) => file.path);
      const uploadResults =
        await this.cloudinaryService.uploadImages(filePaths);
      return uploadResults;
    } catch (error) {
      console.error('Error uploading images ', error);
      throw new Error('Failed to upload images');
    }
  }

  @Post('video')
  @ApiOperation({ summary: 'Upload a video' })
  @ApiResponse({ status: 201, description: 'Video uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('video'))
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() dto: UploadVideoDto,
  ) {
    try {
      const result = await this.cloudinaryService.uploadVideo(file.path);
      return result;
    } catch (error) {
      console.error('Error uploading video ', error);
      throw new Error('Failed to upload video');
    }
  }

  @Delete(':imageUrl')
  @ApiOperation({ summary: 'Delete an uploaded image' })
  @ApiResponse({ status: 200, description: 'Image deleted successfully' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteImage(@Param('imageUrl') imageUrl: string) {
    try {
      const deletionResult = await this.cloudinaryService.deleteImage(imageUrl);
      return deletionResult;
    } catch (error) {
      console.error('Error deleting image ', error);
      throw new InternalServerErrorException('Failed to delete image');
    }
  }
}
