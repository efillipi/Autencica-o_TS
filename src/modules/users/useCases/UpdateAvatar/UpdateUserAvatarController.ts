import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateUserAvatarService from '@modules/users/useCases/UpdateAvatar/UpdateUserAvatarService';

class UpdateUserAvatarController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { filename } = request.file;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const updateUserAvatar = await updateUserAvatarService.execute({
      id_user: Number(id),
      avatarFilename: filename,
    });

    return response.status(200).json(classToClass(updateUserAvatar));
  }
}

export default UpdateUserAvatarController;
