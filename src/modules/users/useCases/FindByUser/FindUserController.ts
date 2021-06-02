import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import * as yup from 'yup';
import FindUserService from '@modules/users/useCases/FindByUser/FindUserService';
import AppError from '@shared/errors/AppError';

class FindUserController {
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

    const findUserService = container.resolve(FindUserService);

    const users = await findUserService.execute({
      id_user: Number(id),
    });

    return response.status(200).json(classToClass(users));
  }
}

export default FindUserController;
