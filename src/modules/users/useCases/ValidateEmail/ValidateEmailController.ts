import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';
import AppError from '@shared/errors/AppError';
import ValidateEmailService from '@modules/users/useCases/ValidateEmail/ValidateEmailService';

class ValidateEmailController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { token } = request.body;

    const validateEmailService = container.resolve(ValidateEmailService);

    const schema = yup.object().shape({
      token: yup.string().min(1).required('token é obrigatório'),
    });

    await schema.validate({ token }).catch(err => {
      throw new AppError(err.errors, 422);
    });

    await validateEmailService.execute({
      token,
    });

    return response.status(204).json({});
  }
}

export default ValidateEmailController;
