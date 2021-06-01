import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateProfileService from '@modules/users/useCases/UpdateProfile/UpdateProfileService';

class UpdateProfileController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { name, email, password, old_password } = request.body;

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
