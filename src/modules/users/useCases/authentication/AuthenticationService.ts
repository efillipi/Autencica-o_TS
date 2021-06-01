import User from '@modules/users/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/Container/providers/HashProvider/models/IHashProvider';
import IAuthProvider from '@modules/users/providers/AuthProvider/models/IAuthProvider';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  roles: string[];
  refresh_token: string;
}

@injectable()
class AuthenticationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('AuthProvider')
    private authProvider: IAuthProvider,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Falha na Autenticação', 401);
    }

    const matchPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!matchPassword) {
      throw new AppError('Falha na Autenticação', 401);
    }

    if (user.active === false) {
      throw new AppError('Usuario inativo', 401);
    }

    const token = await this.authProvider.sing(user);

    const refresh_token = await this.userTokenRepository.generate(user.id);

    const roles = user?.roles?.map(role => role.name);
    delete user.roles;

    return {
      user,
      token,
      roles,
      refresh_token: refresh_token.token,
    };
  }
}

export default AuthenticationService;
