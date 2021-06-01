import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ValidateEmailService from '@modules/users/useCases/ValidateEmail/ValidateEmailService';

class ValidateEmailController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { token } = request.body;

    const validateEmailService = container.resolve(ValidateEmailService);

    await validateEmailService.execute({
      token,
    });

    return response.status(204).json({});
  }
}

export default ValidateEmailController;
