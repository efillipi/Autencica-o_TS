import AppError from '@shared/errors/AppError';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAuthProvider from '@modules/users/providers/AuthProvider/models/IAuthProvider';
import { injectable, inject } from 'tsyringe';
import { isAfter, addDays } from 'date-fns';

interface IRequest {
  token: string;
}

interface IResponse {
  token: string;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AuthProvider')
    private authProvider: IAuthProvider,
  ) {}

  public async execute({ token }: IRequest): Promise<IResponse> {
    const tokenExists = await this.userTokenRepository.findByToken(token);

    if (!tokenExists) {
      throw new AppError('Refresh token invalido');
    }

    const tokenCreated_at = tokenExists.created_at;
    const compareDate = addDays(
      tokenCreated_at,
      Number(process.env.REFRESH_EXPIRESIN_DAYS),
    );

    if (isAfter(Date.now(), compareDate)) {
      await this.userTokenRepository.delete(tokenExists.id);
      throw new AppError('Refresh token expirado');
    }

    const user = await this.usersRepository.findById(tokenExists.id_user);
    const newToken = await this.authProvider.sing(user);

    return { token: newToken };
  }
}

export default RefreshTokenService;
