import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteUserService from '@modules/users/useCases/DeleteUser/DeleteUserService';

class UserController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = container.resolve(DeleteUserService);

    const user = await deleteUserService.execute({
      id_user: Number(id),
    });

    return response.status(204).json(user);
  }
}

export default UserController;
