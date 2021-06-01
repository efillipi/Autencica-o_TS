import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import { isAfter, addHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  token: string;
}

@injectable()
class ValidateEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ token }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token invalido');
    }

    if (userToken.active === false) {
      throw new AppError('Token invalido');
    }

    const user = await this.usersRepository.findById(userToken.id_user);

    if (!user) {
      throw new AppError('Token invalido');
    }

    user.active = true;

    const tokenCreated_at = userToken.created_at;
    const compareDate = addHours(
      tokenCreated_at,
      Number(process.env.TOKEN_TIME_HOURS),
    );

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }

    await this.usersRepository.save(user);
    await this.userTokenRepository.delete(userToken.id);
  }
}

export default ValidateEmailService;
