import IHashProvider from '@shared/Container/providers/HashProvider/models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const hashPassword = payload === hashed;

    return hashPassword;
  }
}
export default FakeHashProvider;
