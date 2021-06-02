import Role from '@modules/roles/typeorm/entities/Role';
import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';
import { getRepository, In, Repository } from 'typeorm';

class RoleRepository implements IRoleRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async create({
    name,
    description,
  }: ICreateRoleDTO): Promise<Role | undefined> {
    const role = this.ormRepository.create({
      name,
      description,
    });

    await this.ormRepository.save(role);

    return role;
  }

  public async save(role: Role): Promise<Role> {
    this.ormRepository.save(role);

    return role;
  }

  public async findById(id: number): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne(
      { id },
      { relations: ['users'] },
    );

    return role;
  }

  public async findByIds(ids: number[]): Promise<Role[] | undefined> {
    const role = await this.ormRepository.findByIds(ids);

    return role;
  }

  public async findByNames(names: string[]): Promise<Role[] | undefined> {
    const roles = await this.ormRepository.find({
      where: {
        name: In(names),
      },
    });

    return roles;
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({
      where: { name },
    });

    return role;
  }

  public async find(): Promise<Role[] | undefined> {
    const roles = await this.ormRepository.find();
    return roles;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default RoleRepository;
