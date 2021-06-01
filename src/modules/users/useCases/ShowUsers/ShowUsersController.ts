import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ShowUsersService from '@modules/users/useCases/ShowUsers/ShowUsersService';

class ShowUsersController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const filter = request.query;
    const role = filter.role as string;

    const showUsersService = container.resolve(ShowUsersService);

    const users = await showUsersService.execute({
      role,
    });

    return response.status(200).json(classToClass(users));
  }
}

export default ShowUsersController;
