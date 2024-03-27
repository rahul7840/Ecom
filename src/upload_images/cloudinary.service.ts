import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      const publicId = this.extractPublicIdFromUrl(imageUrl);
      await v2.uploader.destroy(publicId);
    } catch (error) {
      console.error('Cloudinary image deletion error:', error);
      throw new Error('Failed to delete image in Cloudinary');
    }
  }

  private extractPublicIdFromUrl(imageUrl: string): string {
    const publicIdMatch = imageUrl.match(/\/v\d+\/(.+?)\./);
    if (publicIdMatch) {
      return publicIdMatch[1];
    }

    throw new Error('Invalid Cloudinary image URL format');
  }

  async uploadImages(filePaths: string[]): Promise<string[]> {
    try {
      const uploadPromises = filePaths.map(async (filePath) => {
        const result = await v2.uploader.upload(filePath, {
          folder: 'uploads',
        });
        return result.secure_url || '';
      });

      const uploadResults = await Promise.all(uploadPromises);
      return uploadResults;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new Error('Failed to upload images to Cloudinary');
    }
  }

  async uploadVideo(filePath: string): Promise<string> {
    try {
      const result = await v2.uploader.upload(filePath, {
        folder: 'uploads',
        resource_type: 'video', // Specify resource type as video
        chunk_size: 6000000, // Set chunk size if needed
      });

      return result.secure_url || '';
    } catch (error) {
      console.error('Cloudinary video upload error:', error);
      throw new Error('Failed to upload video to Cloudinary');
    }
  }
}
