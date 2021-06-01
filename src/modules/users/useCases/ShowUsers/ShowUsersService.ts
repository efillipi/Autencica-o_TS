import User from '@modules/users/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IRolerRepository from '@modules/roles/repositories/IRolerRepository';
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

    @inject('RolerRepository')
    private rolerRepository: IRolerRepository,
  ) {}

  public async execute({ role }: IRequest): Promise<User[]> {
    if (!role) {
      const users = await this.usersRepository.find();

      return users;
    }

    const roleExist = await this.rolerRepository.findByName(role);

    if (!roleExist) {
      throw new AppError('Role informada invalida');
    }

    const roleId = roleExist.id;

    const users = await this.usersRepository.findByRole(roleId);

    return users;
  }
}

export default ShowUsersService;
