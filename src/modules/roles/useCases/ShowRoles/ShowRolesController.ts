import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ShowRolesService from '@modules/roles/useCases/ShowRoles/ShowRolesService';

class ShowRolesController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const showRolesService = container.resolve(ShowRolesService);

    const roles = await showRolesService.execute();

    return response.status(200).json(classToClass(roles));
  }
}

export default ShowRolesController;
