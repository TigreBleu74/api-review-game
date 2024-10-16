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

  public async updateGame(
    id: number,
    title: string,
    console_id: number | undefined
  ): Promise<Game | null> {
    const game: Game | null = await Game.findByPk(id);
    if (game) {
      if (title) game.title = title;
      if (console_id) {
        if (!await Console.findByPk(console_id)) {
          notFound('Console');
        }
        game.console_id = console_id;
      }
      await game.save();
      return game;
    }
    notFound('Game');
  }

  public async getGamesByConsoleId(id: number): Promise<GameDTO[]> {
    return Game.findAll({
      where: {
        console_id: id,
      },
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }
}

export const gameService = new GameService();
