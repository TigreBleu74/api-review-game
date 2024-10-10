import { GameDTO } from "./game.dto";

export interface ReviewDTO {
  id?: number;
  review_text: string;
  rating: number;
  game?: GameDTO;
  game_id?: number;
}