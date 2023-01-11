import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("game")
      .where("game.title ILIKE :param", { param: `%${param}%` })
      .groupBy("game.id")
      .getMany()
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(""); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const search = await this.repository
      .createQueryBuilder("game")
      .where("game.id = :id", { id })
      .leftJoinAndSelect("game.users", "user")
      .select("user")
      .getRawMany()
    
    console.log(search)
    return search
  }
}
