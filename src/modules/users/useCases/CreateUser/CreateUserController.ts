import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/users/useCases/CreateUser/CreateUserService';

class UserController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, password, active, roles } = request.body;

    const createUserServices = container.resolve(CreateUserService);

    const user = await createUserServices.execute({
      name,
      email,
      password,
      active,
      roles,
    });

    return response.status(201).json(classToClass(user));
  }
}

export default UserController;
