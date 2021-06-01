import Roler from '@modules/roles/typeorm/entities/Role';
import AppError from '@shared/errors/AppError';
import IRolerRepository from '@modules/roles/repositories/IRolerRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id: number;
  name: string;
  description: string;
}

@injectable()
class UpdateRoleService {
  constructor(
    @inject('RolerRepository')
    private rolerRepository: IRolerRepository,
  ) {}

  public async execute({ id, name, description }: IRequest): Promise<Roler> {
    const role = await this.rolerRepository.findById(id);

    if (!role) {
      throw new AppError('Role informada invalida', 404);
    }

    const existRole = await this.rolerRepository.findByName(name);

    if (existRole && existRole.id !== role.id) {
      throw new AppError('Role ja cadastrada!', 409);
    }

    role.name = name;
    role.description = description;

    await this.rolerRepository.save(role);

    return role;
  }
}

export default UpdateRoleService;
