import { Console } from '../models/console.model';
import { notFound } from '../error/NotFoundError';
import { Game } from '../models/game.model';
import { Review } from '../models/review.model';
import {preconditionRequired} from '../error/PreconditionRequiredError';

export class ConsoleService {

  // Récupère toutes les consoles
  public async getAllConsoles(): Promise<Console[]> {
    return await Console.findAll();
  }

  // Récupère une console par ID
  public async getConsoleById(id: number) {
    const console: Console | null = await Console.findByPk(id);
    if (!console) {
      notFound('Console');
    }
    return console;
  }

  // Crée une nouvelle console
  public async createConsole(
    name: string,
    manufacturer: string
  ): Promise<Console> {
    return Console.create({ name: name, manufacturer: manufacturer });
  }

  // Supprime une console par ID
  public async deleteConsole(id: number): Promise<void> {
    const console: Console | null = await Console.findByPk(id);
    if (console) {
      const games: Game[] = await Game.findAll({
        where: {
          console_id: id
        }
      });
      for (const game of games) {
        const reviews: Review[] = await Review.findAll({
          where: {
            game_id: game.id
          }
        });
        if (reviews.length > 0) {
          preconditionRequired('Reviews');
        }
      }
      await console.destroy();
    } else {
      notFound('Console');
    }
  }

  // Met à jour une console
  public async updateConsole(
    id: number,
    name?: string,
    manufacturer?: string
  ): Promise<Console | null> {
    const console = await Console.findByPk(id);
    if (console) {
      if (name) console.name = name;
      if (manufacturer) console.manufacturer = manufacturer;
      await console.save();
      return console;
    }
    notFound('Console');
  }
}

export const consoleService = new ConsoleService();
