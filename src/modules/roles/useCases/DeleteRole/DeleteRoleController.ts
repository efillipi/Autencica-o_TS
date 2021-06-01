import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteRolerService from '@modules/roles/useCases/DeleteRole/DeleteRoleService';

class DeleteRoleController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteRolerService = container.resolve(DeleteRolerService);

    await deleteRolerService.execute({ id });

    return response.status(204).json();
  }
}

export default DeleteRoleController;
