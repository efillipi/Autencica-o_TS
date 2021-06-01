import Roler from '@modules/roles/typeorm/entities/Role';
import IRolerRepository from '@modules/roles/repositories/IRolerRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class ShowRolesService {
  constructor(
    @inject('RolerRepository')
    private rolerRepository: IRolerRepository,
  ) {}

  public async execute(): Promise<Roler[]> {
    const roles = await this.rolerRepository.find();

    return roles;
  }
}

export default ShowRolesService;
