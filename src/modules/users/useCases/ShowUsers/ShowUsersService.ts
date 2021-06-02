import User from '@modules/users/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

interface IRequest {
  role?: string;
}

@injectable()
class ShowUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  public async execute({ role }: IRequest): Promise<User[]> {
    if (!role) {
      const users = await this.usersRepository.find();

      return users;
    }

    const roleExist = await this.roleRepository.findByName(role);

    if (!roleExist) {
      throw new AppError('Role informada invalida');
    }

    const roleId = roleExist.id;

    const users = await this.usersRepository.findByRole(roleId);

    return users;
  }
}

export default ShowUsersService;
