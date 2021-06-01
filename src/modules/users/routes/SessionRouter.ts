import { Router } from 'express';

import AuthenticationController from '@modules/users/useCases/authentication/AuthenticationController';

const SessionRouter = Router();
const authenticationController = new AuthenticationController();

SessionRouter.post('/', authenticationController.execute);

export default SessionRouter;
