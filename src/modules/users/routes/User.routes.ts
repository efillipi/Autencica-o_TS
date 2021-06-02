import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuth from '@shared/middlewares/ensureAuth';

import CreateUserController from '@modules/users/useCases/CreateUser/CreateUserController';
import DeleteUserController from '@modules/users/useCases/DeleteUser/DeleteUserController';
import FindUserController from '@modules/users/useCases/FindByUser/FindUserController';
import UpdateUserController from '@modules/users/useCases/UpdateUser/UpdateUserController';
import ShowUsersController from '@modules/users/useCases/ShowUsers/ShowUsersController';

import ValidateEmailController from '@modules/users/useCases/ValidateEmail/ValidateEmailController';

import UpdateUserAvatarController from '@modules/users/useCases/UpdateAvatar/UpdateUserAvatarController';

const UserRouter = Router();
const upload = multer(uploadConfig);

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const showUsersController = new ShowUsersController();

const validateEmailController = new ValidateEmailController();

const updateUserAvatarController = new UpdateUserAvatarController();

UserRouter.post('/', ensureAuth(['ADM', 'USER']), createUserController.execute);

UserRouter.post('/validate-email', validateEmailController.execute);

UserRouter.get('/', ensureAuth(['ADM', 'USER']), showUsersController.execute);

UserRouter.get('/:id', ensureAuth(['ADM', 'USER']), findUserController.execute);

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

UserRouter.patch(
  '/avatar',
  ensureAuth(['ADM', 'USER']),
  upload.single('avatar'),
  updateUserAvatarController.execute,
);

export default UserRouter;
