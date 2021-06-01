import Roler from '@modules/roles/typeorm/entities/Role';
import AppError from '@shared/errors/AppError';
import IRolerRepository from '@modules/roles/repositories/IRolerRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id: number;
}

@injectable()
class FindRoleService {
  constructor(
    @inject('RolerRepository')
    private rolerRepository: IRolerRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Roler> {
    const role = await this.rolerRepository.findById(id);

    if (!role) {
      throw new AppError('Role informada invalida', 404);
    }

    return role;
  }
}

export default FindRoleService;