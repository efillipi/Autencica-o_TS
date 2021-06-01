import Roler from '@modules/roles/typeorm/entities/Role';
import IRolerRepository from '@modules/roles/repositories/IRolerRepository';
import ICreateRolerDTO from '@modules/roles/dtos/ICreateRoleDTO';
import { getRepository, In, Repository } from 'typeorm';

class RolerRepository implements IRolerRepository {
  private ormRepository: Repository<Roler>;

  constructor() {
    this.ormRepository = getRepository(Roler);
  }

  public async create({
    name,
    description,
  }: ICreateRolerDTO): Promise<Roler | undefined> {
    const role = this.ormRepository.create({
      name,
      description,
    });

    await this.ormRepository.save(role);

    return role;
  }

  public async save(role: Roler): Promise<Roler> {
    this.ormRepository.save(role);

    return role;
  }

  public async findById(id: number): Promise<Roler | undefined> {
    const role = await this.ormRepository.findOne(
      { id },
      { relations: ['users'] },
    );

    return role;
  }

  public async findByIds(ids: number[]): Promise<Roler[] | undefined> {
    const role = await this.ormRepository.findByIds(ids);

    return role;
  }

  public async findByNames(names: string[]): Promise<Roler[] | undefined> {
    const roles = await this.ormRepository.find({
      where: {
        name: In(names),
      },
    });

    return roles;
  }

  public async findByName(name: string): Promise<Roler | undefined> {
    const role = await this.ormRepository.findOne({
      where: { name },
    });

    return role;
  }

  public async find(): Promise<Roler[] | undefined> {
    const roles = await this.ormRepository.find();
    return roles;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default RolerRepository;
