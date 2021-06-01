import User from '@modules/users/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: number): Promise<User | undefined>;
  delete(id: number): Promise<void>;
  create(data: ICreateUserDTO): Promise<User | undefined>;
  save(user: User): Promise<User>;
  find(): Promise<User[]>;
  findByRole(idRole: number): Promise<User[]>;
}
