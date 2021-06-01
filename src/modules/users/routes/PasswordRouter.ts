import { Router } from 'express';

import ForgotPasswordController from '@modules/users/useCases/SendForgotPasswordEmail/ForgotPasswordController';

import ResetPasswordController from '@modules/users/useCases/ResetPassword/ResetPasswordController';

const PasswordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

PasswordRouter.post('/reset', resetPasswordController.create);
PasswordRouter.post('/forgot', forgotPasswordController.create);

export default PasswordRouter;
