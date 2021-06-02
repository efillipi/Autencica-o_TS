import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import * as yup from 'yup';
import UpdateRoleService from '@modules/roles/useCases/UpdateRole/UpdateRoleService';
import AppError from '@shared/errors/AppError';

class UpdateRoleController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const { name, description } = request.body;

    const id_role = Number(id);

    const schema = yup.object().shape({
      id_role: yup.number().min(1).required('id da Role é obrigatório'),
      name: yup.string(),
      description: yup.string(),
    });

    await schema
      .validate({ id_role, name, description }, { abortEarly: false })
      .catch(err => {
        throw new AppError(err.errors, 422);
      });

    const updateRolesService = container.resolve(UpdateRoleService);

    const role = await updateRolesService.execute({
      id_role,
      name,
      description,
    });

    return response.status(200).json(classToClass(role));
  }
}

export default UpdateRoleController;
