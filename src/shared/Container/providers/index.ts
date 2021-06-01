import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import BCryptHashProvider from '@shared/Container/providers/HashProvider/useCases/BCryptHashProvider';
import IHashProvider from '@shared/Container/providers/HashProvider/models/IHashProvider';

import IStorageProvider from '@shared/Container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/Container/providers/StorageProvider/useCases/DiskStorageProvider';

import IMailProvider from '@shared/Container/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/Container/providers/MailProvider/useCases/EtherealMailProvider';
import MailProvider from '@shared/Container/providers/MailProvider/useCases/MailProvider';

import IMailTemplateProvider from '@shared/Container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/Container/providers/MailTemplateProvider/useCases/HandlebarsMailTemplateProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  mailProvider: container.resolve(MailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
