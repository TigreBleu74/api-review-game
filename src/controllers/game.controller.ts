import {Body, Controller, Get, Path, Post, Route, Tags} from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";

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
}