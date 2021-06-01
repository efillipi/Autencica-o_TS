import AppError from '@shared/errors/AppError';
import User from '@modules/users/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/Container/providers/StorageProvider/models/IStorageProvider';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id_user: number;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id_user, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      await this.storageProvider.clearTmp(avatarFilename);
      throw new AppError(
        'Apenas usuários autênticos podem mudam de avatar',
        401,
      );
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
