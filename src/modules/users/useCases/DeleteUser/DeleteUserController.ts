import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';
import DeleteUserService from '@modules/users/useCases/DeleteUser/DeleteUserService';
import AppError from '@shared/errors/AppError';

class UserController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const id_user = Number(id);

    const schema = yup.object().shape({
      id_user: yup.number().min(1).required('id do Usuario é obrigatório'),
    });

    await schema.validate({ id_user }).catch(err => {
      throw new AppError(err.errors, 422);
    });

    const deleteUserService = container.resolve(DeleteUserService);

    const user = await deleteUserService.execute({
      id_user,
    });

    return response.status(204).json(user);
  }
}

export default UserController;
