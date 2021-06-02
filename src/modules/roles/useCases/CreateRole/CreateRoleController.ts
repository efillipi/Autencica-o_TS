import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import * as yup from 'yup';
import CreateRoleService from '@modules/roles/useCases/CreateRole/CreateRoleService';
import AppError from '@shared/errors/AppError';

class CreateRoleController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, description } = request.body;

    const schema = yup.object().shape({
      name: yup.string().min(1).required('name é obrigatório'),
      description: yup.string().min(1).required('description é obrigatório'),
    });

    await schema.validate(request.body, { abortEarly: false }).catch(err => {
      throw new AppError(err.errors, 422);
    });

    const createRoleService = container.resolve(CreateRoleService);

    const role = await createRoleService.execute({
      name,
      description,
    });

    return response.status(201).json(classToClass(role));
  }
}

export default CreateRoleController;
