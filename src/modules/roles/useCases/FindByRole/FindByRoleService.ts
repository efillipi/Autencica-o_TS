import Role from '@modules/roles/typeorm/entities/Role';
import AppError from '@shared/errors/AppError';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id_role: number;
}

@injectable()
class FindRoleService {
  constructor(
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  public async execute({ id_role }: IRequest): Promise<Role> {
    const role = await this.roleRepository.findById(id_role);

    if (!role) {
      throw new AppError('Role informada invalida', 404);
    }

    return role;
  }
}

export default FindRoleService;
