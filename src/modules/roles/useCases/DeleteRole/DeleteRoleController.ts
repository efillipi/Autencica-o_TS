import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';
import DeleteRolerService from '@modules/roles/useCases/DeleteRole/DeleteRoleService';
import AppError from '@shared/errors/AppError';

class DeleteRoleController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const id_role = Number(id);

    const schema = yup.object().shape({
      id_role: yup.number().required('id da Role é obrigatório'),
    });

    await schema.validate({ id_role }).catch(err => {
      throw new AppError(err.errors, 422);
    });

    const deleteRolerService = container.resolve(DeleteRolerService);

    await deleteRolerService.execute({ id: id_role });

    return response.status(204).json();
  }
}

export default DeleteRoleController;
