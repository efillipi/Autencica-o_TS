import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateUserService from '@modules/users/useCases/UpdateUser/UpdateUserService';

class UpdateUserController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const { name, email, password, active, roles } = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      id_user: Number(id),
      name,
      email,
      password,
      active,
      roles,
    });

    return response.status(200).json(classToClass(user));
  }
}

export default UpdateUserController;
