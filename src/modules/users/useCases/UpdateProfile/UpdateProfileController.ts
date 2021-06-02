import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import * as yup from 'yup';
import AppError from '@shared/errors/AppError';
import UpdateProfileService from '@modules/users/useCases/UpdateProfile/UpdateProfileService';

class UpdateProfileController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { name, email, password, old_password } = request.body;

    const schema = yup.object().shape({
      name: yup.string().min(1).optional(),
      email: yup.string().email().min(1).optional(),
      password: yup.string().min(1).optional(),
      old_password: yup.string().min(1).optional(),
    });

    await schema.validate(request.body, { abortEarly: false }).catch(err => {
      throw new AppError(err.errors, 422);
    });

    const updateProfileService = container.resolve(UpdateProfileService);

    const profile_update = await updateProfileService.execute({
      id_user: Number(id),
      name,
      email,
      password,
      old_password,
    });

    return response.status(200).json(classToClass(profile_update));
  }
}

export default UpdateProfileController;
