import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import * as yup from 'yup';
import AppError from '@shared/errors/AppError';
import UpdateUserService from '@modules/users/useCases/UpdateUser/UpdateUserService';

class UpdateUserController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const id_user = Number(id);

    const { name, email, password, active, roles } = request.body;

    const schema = yup.object().shape({
      id_user: yup.number().min(1).required('id do Usuario é obrigatório'),
      name: yup.string().min(1).optional(),
      email: yup.string().email().min(1).optional(),
      password: yup.string().min(1).optional(),
      active: yup.boolean().optional(),
      roles: yup
        .array(yup.string().min(1).required('Nome da Role é obrigatório'))
        .min(1)
        .optional(),
    });

    await schema
      .validate(
        { id_user, name, email, password, active, roles },
        { abortEarly: false },
      )
      .catch(err => {
        throw new AppError(err.errors, 422);
      });

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      id_user,
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
