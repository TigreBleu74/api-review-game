import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from 'tsoa';
import { GameDTO } from '../dto/game.dto';
import { gameService } from '../services/game.service';
import { reviewService } from '../services/review.service';
import { ReviewDTO } from '../dto/review.dto';

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

  @Post("/")
  public async createGame(
      @Body() requestBody: GameDTO
  ): Promise<GameDTO> {
    const { title, console_id } = requestBody;
    return gameService.createGame(title, console_id);
  }

  @Get("{id}")
  public async getGameById(@Path() id: number): Promise<GameDTO | null> {
    return gameService.getGameById(id);
  }

  @Patch("{id}")
  public async updateGame(
    @Path() id: number,
    @Body() requestBody: GameDTO
  ): Promise<GameDTO | null> {
    const { title, console_id } = requestBody;
    return gameService.updateGame(id, title, console_id);
  }

  @Delete('{id}')
  public async deleteGame(@Path() id: number): Promise<void> {
    await gameService.deleteGame(id);
  }

  @Get('{id}/reviews')
  public async getReviewByGameId(@Path() id: number): Promise<ReviewDTO[] | null> {
    return reviewService.getReviewByGameId(id);
  }
}