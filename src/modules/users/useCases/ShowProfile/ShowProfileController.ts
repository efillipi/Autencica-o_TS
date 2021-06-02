import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import FindUserService from '@modules/users/useCases/ShowProfile/ShowProfileService';

class ShowProfileController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;

    const findUserService = container.resolve(FindUserService);

    const userShow = await findUserService.execute({
      id_user: Number(id),
    });

    return response.status(200).json(classToClass(userShow));
  }
}

export default ShowProfileController;
