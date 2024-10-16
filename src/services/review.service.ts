import { ReviewDTO } from '../dto/review.dto';
import { Review } from '../models/review.model';
import { Game } from '../models/game.model';
import { Console } from '../models/console.model';
import { notFound } from '../error/NotFoundError';

export class ReviewService {
  public async getAllReviews(): Promise<ReviewDTO[]> {
    return Review.findAll({
      include: [
        {
          model: Game,
          as: 'game',
          include: [
            {
              model: Console,
              as: 'console'
            }
          ]
        }
      ]
    });
  }

  public async getReviewById(id: number): Promise<ReviewDTO | null> {
    const review: Review | null = await Review.findByPk(id, {
      include: [
        {
          model: Game,
          as: 'game',
          include: [
            {
              model: Console,
              as: 'console'
            }
          ]
        }
      ]
    });
    if(!review) {
      notFound('Review');
    }
    return review;
  }
}

export const reviewService = new ReviewService();