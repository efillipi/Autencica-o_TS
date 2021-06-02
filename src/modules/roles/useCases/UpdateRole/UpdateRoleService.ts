import Role from '@modules/roles/typeorm/entities/Role';
import AppError from '@shared/errors/AppError';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id_role: number;
  name: string;
  description: string;
}

@injectable()
class UpdateRoleService {
  constructor(
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  public async execute({
    id_role,
    name,
    description,
  }: IRequest): Promise<Role> {
    const role = await this.roleRepository.findById(id_role);

    if (!role) {
      throw new AppError('Role informada invalida', 404);
    }

    const existRole = await this.roleRepository.findByName(name);

    if (existRole && existRole.id !== role.id) {
      throw new AppError('Role ja cadastrada!', 409);
    }

    role.name = name;
    role.description = description;

    await this.roleRepository.save(role);

    return role;
  }
}

export default UpdateRoleService;
