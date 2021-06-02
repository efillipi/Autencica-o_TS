import AppError from '@shared/errors/AppError';
import IRolerRepository from '@modules/roles/repositories/IRolerRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id_role: number;
}

@injectable()
class DeleteRoleService {
  constructor(
    @inject('RolerRepository')
    private rolerRepository: IRolerRepository,
  ) {}

  public async execute({ id_role }: IRequest): Promise<void> {
    const role = await this.rolerRepository.findById(id_role);

    if (!role) {
      throw new AppError('Role informada invalida', 404);
    }

    await this.rolerRepository.delete(id_role);
  }
}

export default DeleteRoleService;
