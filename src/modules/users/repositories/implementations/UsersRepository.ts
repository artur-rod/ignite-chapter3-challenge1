import { getRepository, Repository } from 'typeorm';

import { IFindUserByFullNameDTO, IFindUserWithGamesDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    return this.repository.findOneOrFail(user_id)
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(""); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(""); // Complete usando raw query
  }
}
