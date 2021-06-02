import AppError from '@shared/errors/AppError';
import User from '@modules/users/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/Container/providers/HashProvider/models/IHashProvider';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import IEmailConfirmationProvider from '@modules/users/providers/EmailConfirmationProvider/models/IEmailConfirmationProvider';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id_user: number;
  name?: string;
  email?: string;
  password?: string;
  active: boolean;
  roles?: string[];
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RoleRepository')
    private roleRepository: IRoleRepository,

    @inject('EmailConfirmation')
    private emailConfirmation: IEmailConfirmationProvider,
  ) {}

  public async execute({
    id_user,
    name,
    email,
    password,
    roles,
    active,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new AppError('Usuário inexistente', 404);
    }

    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id !== id_user) {
      throw new AppError('Email informado em uso', 409);
    }

    if (roles) {
      const existsRoles = await this.roleRepository.findByNames(roles);

      if (existsRoles.length === 0) {
        throw new AppError('Role ou Roles incorretas', 400);
      }

      user.roles = existsRoles;
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password);

      await this.usersRepository.save(user);

      return user;
    }

    user.name = name;
    user.active = active;
    user.email = email;

    if (email && !userWithUpdateEmail) {
      user.active = false;

      await this.emailConfirmation.execute({
        id_user: user.id,
        name,
        email,
      });
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
