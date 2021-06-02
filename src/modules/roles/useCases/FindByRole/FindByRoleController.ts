import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import * as yup from 'yup';
import FindRoleService from '@modules/roles/useCases/FindByRole/FindByRoleService';
import AppError from '@shared/errors/AppError';

class FindRoleController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const id_role = Number(id);

    const schema = yup.object().shape({
      id_role: yup.number().required('id da Role é obrigatório'),
    });

    await schema.validate({ id_role }, { abortEarly: false }).catch(err => {
      throw new AppError(err.errors, 422);
    });

    const findRoleService = container.resolve(FindRoleService);

    const role = await findRoleService.execute({ id: id_role });

    return response.status(200).json(classToClass(role));
  }
}

export default FindRoleController;
