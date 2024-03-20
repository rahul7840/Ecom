import { Injectable } from '@nestjs/common';
import { Review } from '@prisma/client';
import { CreateReviewDto } from './dto/review.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReviewDto) {
    return this.prisma.review.create({ 
        data:{
            comment:data.comment,
            rating:data.rating,
            images:data.images,
            productId:data.productId,
            userId:data.userId
        }
     });
  }

  async findAll() {
    return await this.prisma.review.findMany();
  }

  async findOne(productId:string){
    return await this.prisma.review.findMany({
        where:{
            productId
        }
    })
  }
}
