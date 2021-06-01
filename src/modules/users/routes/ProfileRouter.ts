import { Router } from 'express';
import ensureAuth from '@shared/middlewares/ensureAuth';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UpdateProfileController from '@modules/users/useCases/UpdateProfile/UpdateProfileController';
import ShowProfileController from '@modules/users/useCases/ShowProfile/ShowProfileController';
import UpdateUserAvatarController from '@modules/users/useCases/UpdateAvatar/UpdateUserAvatarController';

const upload = multer(uploadConfig);

const ProfileRouter = Router();

const updateProfileController = new UpdateProfileController();
const showProfileController = new ShowProfileController();
const updateUserAvatarController = new UpdateUserAvatarController();

ProfileRouter.use(ensureAuth(['ADM', 'USER']));

ProfileRouter.put('/', updateProfileController.execute);
ProfileRouter.get('/', showProfileController.execute);

ProfileRouter.patch(
  '/avatar',
  ensureAuth(['ADM', 'USER']),
  upload.single('avatar'),
  updateUserAvatarController.execute,
);

export default ProfileRouter;
