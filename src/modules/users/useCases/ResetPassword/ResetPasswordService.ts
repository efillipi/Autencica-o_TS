import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import IHashProvider from '@shared/Container/providers/HashProvider/models/IHashProvider';
import { isAfter, addHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token do usuário invalido');
    }

    if (userToken.active === false) {
      throw new AppError('Token invalido');
    }

    const user = await this.usersRepository.findById(userToken.id_user);

    if (!user) {
      throw new AppError('Usuário invalido');
    }

    const tokenCreated_at = userToken.created_at;
    const compareDate = addHours(
      tokenCreated_at,
      Number(process.env.TOKEN_TIME_HOURS),
    );

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }

    userToken.active = false;

    await this.userTokenRepository.save(userToken);

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
