import { Router } from 'express';

import RefreshTokenController from '@modules/users/useCases/RefreshToken/RefreshTokenController';

const RefreshTokenRouter = Router();

const refreshTokenController = new RefreshTokenController();

RefreshTokenRouter.post('/', refreshTokenController.execute);

export default RefreshTokenRouter;
