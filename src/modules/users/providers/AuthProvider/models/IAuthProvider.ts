/* eslint-disable @typescript-eslint/ban-types */
import User from '@modules/users/typeorm/entities/User';

export default interface IAuthProvider {
  sing(user: User): Promise<string>;
  verify(payload: string): Promise<string | Object>;
}
