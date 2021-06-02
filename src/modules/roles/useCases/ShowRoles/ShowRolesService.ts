import Role from '@modules/roles/typeorm/entities/Role';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class ShowRolesService {
  constructor(
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  public async execute(): Promise<Role[]> {
    const roles = await this.roleRepository.find();

    return roles;
  }
}

export default ShowRolesService;
