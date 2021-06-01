import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id_user: number;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id_user }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new AppError('Usuário inexistente', 404);
    }

    await this.usersRepository.delete(id_user);
  }
}

export default DeleteUserService;
