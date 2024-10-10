import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import {notFound} from '../error/NotFoundError';
import {ConsoleDTO} from '../dto/console.dto';

export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    return Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }

  public async createGame(title: string, console_id: number | undefined): Promise<GameDTO> {
    if (!console_id || !await Console.findByPk(console_id)) {
      notFound('Console');
    }
    return Game.create({ title: title, console_id: console_id });
  }

  public async getGameById(id: number): Promise<GameDTO | null> {
    const game: Game | null = await Game.findByPk(id, {
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
    if (!game) {
      notFound('Game');
    }
    return game;
  }
}

export const gameService = new GameService();
