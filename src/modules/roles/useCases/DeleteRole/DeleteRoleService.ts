import AppError from '@shared/errors/AppError';
import IRolerRepository from '@modules/roles/repositories/IRolerRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id: number;
}

@injectable()
class DeleteRoleService {
  constructor(
    @inject('RolerRepository')
    private rolerRepository: IRolerRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const role = await this.rolerRepository.findById(id);

    if (!role) {
      throw new AppError('Role informada invalida', 404);
    }

    await this.rolerRepository.delete(id);
  }
}

export default DeleteRoleService;
