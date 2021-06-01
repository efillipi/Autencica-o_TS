import IHashProvider from '@shared/Container/providers/HashProvider/models/IHashProvider';
import { hash, compare } from 'bcryptjs';

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const hashPassword = await hash(payload, 8);

    return hashPassword;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const hashPassword = await compare(payload, hashed);

    return hashPassword;
  }
}
export default BCryptHashProvider;
