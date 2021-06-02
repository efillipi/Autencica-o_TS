import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';
import AppError from '@shared/errors/AppError';
import ResetPasswordService from '@modules/users/useCases/ResetPassword/ResetPasswordService';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const schema = yup.object().shape({
      token: yup.string().min(1).required('token é obrigatório'),
      password: yup.string().min(1).required('password é obrigatório'),
    });

    await schema.validate({ token, password }).catch(err => {
      throw new AppError(err.errors, 422);
    });

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({
      token,
      password,
    });

    return response.status(204).json({});
  }
}

export default ResetPasswordController;
