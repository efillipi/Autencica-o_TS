import AppError from '@shared/errors/AppError';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

interface IRequest {
  token: string;
}

@injectable()
class FindByUserTokenService {
  constructor(
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

    const tokenCreated_at = userToken.created_at;
    const compareDate = addHours(
      tokenCreated_at,
      Number(process.env.TOKEN_TIME_HOURS),
    );

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }
  }
}

export default FindByUserTokenService;
