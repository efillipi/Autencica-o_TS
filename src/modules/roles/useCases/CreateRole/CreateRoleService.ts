import Role from '@modules/roles/typeorm/entities/Role';
import AppError from '@shared/errors/AppError';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateRoleService {
  constructor(
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  public async execute({ name, description }: IRequest): Promise<Role> {
    const existRole = await this.roleRepository.findByName(name);

    if (existRole) {
      throw new AppError('Role ja cadastrada!', 409);
    }

    const role = await this.roleRepository.create({
      name,
      description,
    });

    return role;
  }
}

export default CreateRoleService;
