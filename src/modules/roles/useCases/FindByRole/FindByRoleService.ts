import Roler from '@modules/roles/typeorm/entities/Role';
import AppError from '@shared/errors/AppError';
import IRolerRepository from '@modules/roles/repositories/IRolerRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id_role: number;
}

@injectable()
class FindRoleService {
  constructor(
    @inject('RolerRepository')
    private rolerRepository: IRolerRepository,
  ) {}

  public async execute({ id_role }: IRequest): Promise<Roler> {
    const role = await this.rolerRepository.findById(id_role);

    if (!role) {
      throw new AppError('Role informada invalida', 404);
    }

    return role;
  }
}

export default FindRoleService;
