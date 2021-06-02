import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from '@modules/users/useCases/SendForgotPasswordEmail/SendForgotPasswordEmailService';

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const schema = yup.object().shape({
      email: yup.string().email().min(1).required('email é obrigatório'),
    });

    await schema.validate({ email }).catch(err => {
      throw new AppError(err.errors, 422);
    });

    const sendForgotPasswordEmailService = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmailService.execute({
      email,
    });

    return response.status(204).json();
  }
}

export default ForgotPasswordController;
