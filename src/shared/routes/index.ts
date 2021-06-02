import { Router } from 'express';

import DocsRouter from '@shared/routes/DocsRouter';
import RolesRouter from '@modules/roles/routes/RolesRouter';
import UserRouter from '@modules/users/routes/User.routes';
import SessionRouter from '@modules/users/routes/Session.routes';
import PasswordRouter from '@modules/users/routes/Password.routes';
import ProfileRouter from '@modules/users/routes/Profile.routes';
import TokenRouter from '@modules/users/routes/Token.routes';
import RefreshTokenRouter from '@modules/users/routes/RefreshToken.routes';

const routes = Router();

routes.use('/docs', DocsRouter);
routes.use('/roles', RolesRouter);
routes.use('/users', UserRouter);
routes.use('/sessions', SessionRouter);
routes.use('/password', PasswordRouter);
routes.use('/profile', ProfileRouter);
routes.use('/token', TokenRouter);
routes.use('/refresh-token', RefreshTokenRouter);

export default routes;
