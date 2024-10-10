import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Game } from './game.model'; // Connexion à la base de données

export interface ReviewAttributes {
  id?: number;
  review_text: string;
  rating: number;
  game_id: number;
  game?: Game;
}

export class Review extends Model<ReviewAttributes> implements ReviewAttributes {
  public id!: number;
  public review_text!: string;
  public rating!: number;
  public game_id!: number;
  public game!: Game;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    review_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "reviews",
  }
);

Review.belongsTo(Game, { foreignKey: "game_id", as: "game" });