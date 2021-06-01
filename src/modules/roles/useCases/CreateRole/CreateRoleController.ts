import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateRolerService from '@modules/roles/useCases/CreateRole/CreateRoleService';

class CreateRoleController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, description } = request.body;

    const createRolerService = container.resolve(CreateRolerService);

    const role = await createRolerService.execute({
      name,
      description,
    });

    return response.status(201).json(classToClass(role));
  }
}

export default CreateRoleController;
