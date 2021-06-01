/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import role from '../seed/permission.seed';
import { UserAdmSeed } from '../seed/users.seed';

export class Seed1620224137478 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    const roleAdmSeed: any = role.RoleAdmSeed;

    const userAdmSeed: any = UserAdmSeed;

    const roleAdm = await getRepository('roles').save(roleAdmSeed);

    userAdmSeed.roles = roleAdm;

    await getRepository('users').save(userAdmSeed);
  }

  public async down(_: QueryRunner): Promise<any> {
    // do nothing
  }
}
