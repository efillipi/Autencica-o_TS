import { container } from 'tsyringe';

import '@modules/users/providers';

import '@shared/Container/providers';

import IRolerRepository from '@modules/roles/repositories/IRolerRepository';
import RolerRepository from '@modules/roles/typeorm/repositories/RolerRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IRolerRepository>(
  'RolerRepository',
  RolerRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
