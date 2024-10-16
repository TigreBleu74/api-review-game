import { Body, Controller, Get, Path, Post, Route, Tags } from 'tsoa';
import { ReviewDTO } from '../dto/review.dto';
import { reviewService } from '../services/review.service';

@Route('reviews')
@Tags('Reviews')
export class ReviewController extends Controller {
  @Get('/')
  public async getAllReviews(): Promise<ReviewDTO[]> {
    return reviewService.getAllReviews();
  }

  @Get('{id}')
  public async getReviewById(@Path() id: number): Promise<ReviewDTO | null> {
    return reviewService.getReviewById(id);
  }

  @Post('/')
  public async createReview(
    @Body() requestBody: ReviewDTO
  ): Promise<ReviewDTO> {
    const { review_text, rating, game_id } = requestBody;
    return reviewService.createReview(review_text, rating, game_id);
  }
}