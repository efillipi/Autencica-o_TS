import Roler from '@modules/roles/typeorm/entities/Role';
import ICreateRolerDTO from '@modules/roles/dtos/ICreateRoleDTO';

export default interface IUsersRepository {
  findById(id: number): Promise<Roler | undefined>;
  findByIds(ids: number[]): Promise<Roler[] | undefined>;
  findByNames(names: string[]): Promise<Roler[] | undefined>;
  findByName(name: string): Promise<Roler | undefined>;
  create(data: ICreateRolerDTO): Promise<Roler | undefined>;
  save(user: Roler): Promise<Roler>;
  find(): Promise<Roler[]>;
  delete(id: number): Promise<void>;
}
