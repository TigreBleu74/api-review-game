import { ReviewDTO } from '../dto/review.dto';
import { Review } from '../models/review.model';
import { Game } from '../models/game.model';
import { Console } from '../models/console.model';
import { notFound } from '../error/NotFoundError';
import { badRequest } from '../error/BadRequestError';

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

  public async createReview(review_text: string, rating: number, game_id: number | undefined): Promise<ReviewDTO> {
    if (rating < 0 || rating > 10) {
      badRequest('Rating must be between 0 and 10');
    }
    if (!game_id || !await Game.findByPk(game_id)) {
      notFound('Game');
    }
    return Review.create({ review_text: review_text, rating: rating, game_id: game_id });
  }
}

export const reviewService = new ReviewService();