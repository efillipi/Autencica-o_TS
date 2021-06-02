import User from '@modules/users/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/Container/providers/HashProvider/models/IHashProvider';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import IEmailConfirmationProvider from '@modules/users/providers/EmailConfirmationProvider/models/IEmailConfirmationProvider';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  name: string;
  email: string;
  password: string;
  active: boolean;
  roles: string[];
}

@injectable()
class CreateUser {
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
    name,
    email,
    password,
    roles,
  }: IRequest): Promise<User> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('Este Email ja esta sendo utilizado', 409);
    }
    const existsRoles = await this.roleRepository.findByNames(roles);

    if (existsRoles.length === 0) {
      throw new AppError('Role ou Roles incorretas', 400);
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      active: false,
      password: hashPassword,
      roles: existsRoles,
    });

    await this.emailConfirmation.execute({
      id_user: user.id,
      name,
      email,
    });

    return user;
  }
}

export default CreateUser;
