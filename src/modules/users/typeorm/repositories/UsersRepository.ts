import User from '@modules/users/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { getRepository, Repository } from 'typeorm';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
    active,
    roles,
  }: ICreateUserDTO): Promise<User | undefined> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      active,
      roles,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);
    return user;
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(
      { id },
      { relations: ['roles'] },
    );

    return user;
  }

  public async findByRole(idRole: number): Promise<User[] | undefined> {
    const users = await this.ormRepository.find({ relations: ['roles'] });

    const usersByRole = users.filter(({ roles }) =>
      roles.find(({ id }) => id === idRole),
    );

    usersByRole.map(user => delete user.roles);

    return usersByRole;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(
      { email },
      { relations: ['roles'] },
    );

    return user;
  }

  public async find(): Promise<User[] | undefined> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default UsersRepository;
