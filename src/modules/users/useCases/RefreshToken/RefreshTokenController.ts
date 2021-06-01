import { Request, Response } from 'express';
import { container } from 'tsyringe';
import RefreshTokenService from '@modules/users/useCases/RefreshToken/RefreshTokenService';

class RefreshTokenController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { token } = request.body;

    const refreshTokenService = container.resolve(RefreshTokenService);

    const refresh_token = await refreshTokenService.execute({ token });

    return response.status(200).json({ refresh_token: refresh_token.token });
  }
}

export default RefreshTokenController;
