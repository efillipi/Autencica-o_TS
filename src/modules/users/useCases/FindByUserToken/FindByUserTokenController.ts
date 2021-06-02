import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';
import AppError from '@shared/errors/AppError';
import FindByUserTokenService from '@modules/users/useCases/FindByUserToken/FindByUserTokenService';

class FindByUserTokenController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { token } = request.params;

    const schema = yup.object().shape({
      token: yup.string().min(1).required('token é obrigatório'),
    });

    await schema.validate({ token }).catch(err => {
      throw new AppError(err.errors, 422);
    });

    const findByUserTokenService = container.resolve(FindByUserTokenService);

    await findByUserTokenService.execute({ token });

    return response.status(204).json({});
  }
}

export default FindByUserTokenController;
