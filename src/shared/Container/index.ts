import { container } from 'tsyringe';

import '@modules/users/providers';

import '@shared/Container/providers';

import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import RoleRepository from '@modules/roles/typeorm/repositories/RoleRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IRoleRepository>('RoleRepository', RoleRepository);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
