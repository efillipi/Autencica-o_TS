import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AuthenticationService from '@modules/users/useCases/authentication/AuthenticationService';

class AuthenticationController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const authenticationService = container.resolve(AuthenticationService);

    const { token, user, roles, refresh_token } =
      await authenticationService.execute({
        email,
        password,
      });

    return response
      .status(200)
      .json(classToClass({ token, refresh_token, user, roles }));
  }
}

export default AuthenticationController;
