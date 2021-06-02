import Role from '@modules/roles/typeorm/entities/Role';
import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';

export default interface IUsersRepository {
  findById(id: number): Promise<Role | undefined>;
  findByIds(ids: number[]): Promise<Role[] | undefined>;
  findByNames(names: string[]): Promise<Role[] | undefined>;
  findByName(name: string): Promise<Role | undefined>;
  create(data: ICreateRoleDTO): Promise<Role | undefined>;
  save(user: Role): Promise<Role>;
  find(): Promise<Role[]>;
  delete(id: number): Promise<void>;
}
