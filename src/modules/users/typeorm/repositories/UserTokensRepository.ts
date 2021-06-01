import UserToken from '@modules/users/typeorm/entities/UserToken';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import { getRepository, Repository } from 'typeorm';

class UserTokensRepositorio implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(id_user): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      id_user,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async find(): Promise<UserToken[] | undefined> {
    const userToken = await this.ormRepository.find();

    return userToken;
  }

  public async save(token: UserToken): Promise<UserToken> {
    await this.ormRepository.save(token);
    return token;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default UserTokensRepositorio;
