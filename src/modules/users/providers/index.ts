import { container } from 'tsyringe';

import JWTAuthProvider from '@modules/users/providers/AuthProvider/useCases/JWTAuthProvider';
import IAuthProvider from '@modules/users/providers/AuthProvider/models/IAuthProvider';

import IEmailConfirmationProvider from '@modules/users//providers/EmailConfirmationProvider/models/IEmailConfirmationProvider';
import EmailConfirmation from '@modules/users//providers/EmailConfirmationProvider/useCases/EmailConfirmation';

container.registerSingleton<IAuthProvider>('AuthProvider', JWTAuthProvider);

container.registerSingleton<IEmailConfirmationProvider>(
  'EmailConfirmation',
  EmailConfirmation,
);
