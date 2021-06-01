import path from 'path';

const emailConfirmation = path.resolve(
  __dirname,
  '..',
  'modules',
  'users',
  'views',
  'emailConfirmation.hbs',
);

const forgotPassword = path.resolve(
  __dirname,
  '..',
  'modules',
  'users',
  'views',
  'forgotPassword.hbs',
);

export default {
  emailConfirmation,
  forgotPassword,
};
