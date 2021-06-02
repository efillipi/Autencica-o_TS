import { Router } from 'express';
import ensureAuth from '@shared/middlewares/ensureAuth';

import UpdateProfileController from '@modules/users/useCases/UpdateProfile/UpdateProfileController';
import ShowProfileController from '@modules/users/useCases/ShowProfile/ShowProfileController';

const ProfileRouter = Router();

const updateProfileController = new UpdateProfileController();
const showProfileController = new ShowProfileController();

ProfileRouter.use(ensureAuth(['ADM', 'USER']));

ProfileRouter.get('/', showProfileController.execute);
ProfileRouter.put('/', updateProfileController.execute);

export default ProfileRouter;
