import IAuthProvider from '@modules/users/providers/AuthProvider/models/IAuthProvider';
import authConfig from '@config/auth';
import User from '@modules/users/typeorm/entities/User';
import { sign, verify } from 'jsonwebtoken';

class JWTAuthProvider implements IAuthProvider {
  public async sing(user: User): Promise<string> {
    const { secretPrivate, expiresIn } = authConfig.JWT;

    const roles = user.roles.map(role => role.name);

    const token = sign(
      {
        roles,
      },
      secretPrivate,
      {
        subject: String(user.id),
        expiresIn,
      },
    );

    return token;
  }

  public async verify(token: string) {
    const { secretPrivate } = authConfig.JWT;

    const decode = verify(token, secretPrivate);

    return decode;
  }
}
export default JWTAuthProvider;
