import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateRolerService from '@modules/roles/useCases/UpdateRole/UpdateRoleService';

class UpdateRoleController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const { name, description } = request.body;

    const updateRolesService = container.resolve(UpdateRolerService);

    const role = await updateRolesService.execute({
      id,
      name,
      description,
    });

    return response.status(200).json(classToClass(role));
  }
}

export default UpdateRoleController;
