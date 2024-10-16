import {Controller, Get, Path, Route, Tags} from 'tsoa';
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
}