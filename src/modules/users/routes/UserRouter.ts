import { Router } from 'express';
import ensureAuth from '@shared/middlewares/ensureAuth';

import CreateUserController from '@modules/users/useCases/CreateUser/CreateUserController';
import DeleteUserController from '@modules/users/useCases/DeleteUser/DeleteUserController';
import FindUserController from '@modules/users/useCases/FindByUser/FindUserController';
import UpdateUserController from '@modules/users/useCases/UpdateUser/UpdateUserController';
import ShowUsersController from '@modules/users/useCases/ShowUsers/ShowUsersController';

import ValidateEmailController from '@modules/users/useCases/ValidateEmail/ValidateEmailController';
import FindByUserTokenController from '@modules/users/useCases/FindByUserToken/FindByUserTokenController';
import RefreshTokenController from '@modules/users/useCases/RefreshToken/RefreshTokenController';

const UserRouter = Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const showUsersController = new ShowUsersController();

const validateEmailController = new ValidateEmailController();
const findByUserTokenController = new FindByUserTokenController();
const refreshTokenController = new RefreshTokenController();

UserRouter.post('/', ensureAuth(['ADM', 'USER']), createUserController.execute);

UserRouter.post('/validate-email', validateEmailController.execute);

UserRouter.get('/', ensureAuth(['ADM', 'USER']), showUsersController.execute);

UserRouter.get('/:id', ensureAuth(['ADM', 'USER']), findUserController.execute);

UserRouter.get('/validate-token/:token', findByUserTokenController.execute);
UserRouter.post('/refresh-token', refreshTokenController.execute);

UserRouter.put(
  '/:id',
  ensureAuth(['ADM', 'USER']),
  updateUserController.execute,
);

UserRouter.delete(
  '/:id',
  ensureAuth(['ADM', 'USER']),
  deleteUserController.execute,
);

export default UserRouter;
