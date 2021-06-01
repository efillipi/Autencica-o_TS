import UserToken from '@modules/users/typeorm/entities/UserToken';

export default interface IUserTokenRepository {
  generate(id_user: number): Promise<UserToken>;
  findByToken(userToken: string): Promise<UserToken | undefined>;
  find(): Promise<UserToken[] | undefined>;
  save(token: UserToken): Promise<UserToken | undefined>;
  delete(id: number): Promise<void>;
}
