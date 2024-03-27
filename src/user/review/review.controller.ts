import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/review.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: 'Create a review' })
  @ApiResponse({ status: 201, description: 'Review created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, description: 'Returns all reviews' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async findAll() {
    return this.reviewService.findAll();
  }

  @ApiOperation({ summary: 'Get reviews by product ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns reviews for the specified product',
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get(':productId')
  async findOne(@Param('productId') productId: string) {
    return this.reviewService.findOne(productId);
  }
}
