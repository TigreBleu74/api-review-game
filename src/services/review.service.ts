import { ReviewDTO } from '../dto/review.dto';
import { Review } from '../models/review.model';
import { Game } from '../models/game.model';
import {Console} from '../models/console.model';

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
}

export const reviewService = new ReviewService();