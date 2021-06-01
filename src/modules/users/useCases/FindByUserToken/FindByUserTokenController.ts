import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindByUserTokenService from '@modules/users/useCases/FindByUserToken/FindByUserTokenService';

class FindByUserTokenController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { token } = request.params;

    const findByUserTokenService = container.resolve(FindByUserTokenService);

    await findByUserTokenService.execute({ token });

    return response.status(204).json({});
  }
}

export default FindByUserTokenController;
