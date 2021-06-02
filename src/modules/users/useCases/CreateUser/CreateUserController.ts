import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import * as yup from 'yup';
import CreateUserService from '@modules/users/useCases/CreateUser/CreateUserService';
import AppError from '@shared/errors/AppError';

class UserController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, password, active, roles } = request.body;

    const schema = yup.object().shape({
      name: yup.string().min(1).required('name é obrigatório'),
      email: yup.string().email().min(1).required('email é obrigatório'),
      password: yup.string().min(1).required('password é obrigatório'),
      active: yup.boolean().required('active é obrigatório'),
      roles: yup
        .array(yup.string().min(1).required('Nome da Role é obrigatório'))
        .min(1)
        .required('Role é obrigatório'),
    });

    await schema.validate(request.body, { abortEarly: false }).catch(err => {
      throw new AppError(err.errors, 422);
    });

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
