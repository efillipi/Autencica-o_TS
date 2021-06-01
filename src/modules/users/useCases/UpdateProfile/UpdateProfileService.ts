import AppError from '@shared/errors/AppError';
import User from '@modules/users/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/Container/providers/HashProvider/models/IHashProvider';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id_user?: number;
  name?: string;
  email?: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id_user,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new AppError('Usuário inexistente', 404);
    }

    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id !== id_user) {
      throw new AppError('Email informado em uso', 409);
    }

    if (password && !old_password) {
      throw new AppError('Senha antiga não informada');
    }

    if (password && old_password) {
      const user_password = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!user_password) {
        throw new AppError(
          'Operação não Autozirada, senha anterior informada incorreta',
          401,
        );
      }
      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
