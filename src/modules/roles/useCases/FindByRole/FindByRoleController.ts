import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import FindRoleService from '@modules/roles/useCases/FindByRole/FindByRoleService';

class FindRoleController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const findRoleService = container.resolve(FindRoleService);

    const role = await findRoleService.execute({ id });

    return response.status(200).json(classToClass(role));
  }
}

export default FindRoleController;
