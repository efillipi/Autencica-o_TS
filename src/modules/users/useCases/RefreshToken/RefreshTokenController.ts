import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';
import AppError from '@shared/errors/AppError';
import RefreshTokenService from '@modules/users/useCases/RefreshToken/RefreshTokenService';

class RefreshTokenController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { token } = request.body;

    const schema = yup.object().shape({
      token: yup.string().min(1).required('token é obrigatório'),
    });

    await schema.validate({ token }).catch(err => {
      throw new AppError(err.errors, 422);
    });

    const refreshTokenService = container.resolve(RefreshTokenService);

    const refresh_token = await refreshTokenService.execute({ token });

    return response.status(200).json({ refresh_token: refresh_token.token });
  }
}

export default RefreshTokenController;
