import { Router } from 'express';

import FindByUserTokenController from '@modules/users/useCases/FindByUserToken/FindByUserTokenController';

const TokenRouter = Router();

const findByUserTokenController = new FindByUserTokenController();

TokenRouter.get('/validate/:token', findByUserTokenController.execute);

export default TokenRouter;
