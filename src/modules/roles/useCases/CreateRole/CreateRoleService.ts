import Roler from '@modules/roles/typeorm/entities/Role';
import AppError from '@shared/errors/AppError';
import IRolerRepository from '@modules/roles/repositories/IRolerRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolerRepository')
    private rolerRepository: IRolerRepository,
  ) {}

  public async execute({ name, description }: IRequest): Promise<Roler> {
    const existRole = await this.rolerRepository.findByName(name);

    if (existRole) {
      throw new AppError('Role ja cadastrada!', 409);
    }

    const role = await this.rolerRepository.create({
      name,
      description,
    });

    return role;
  }
}

export default CreateRoleService;
