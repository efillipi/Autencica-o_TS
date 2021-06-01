import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import FindUserService from '@modules/users/useCases/FindByUser/FindUserService';

class FindUserController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const findUserService = container.resolve(FindUserService);

    const users = await findUserService.execute({
      id_user: Number(id),
    });

    return response.status(200).json(classToClass(users));
  }
}

export default FindUserController;
