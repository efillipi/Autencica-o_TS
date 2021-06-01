import { Router } from 'express';

import DocsRouter from '@shared/routes/DocsRouter';
import RolesRouter from '@modules/roles/routes/RolesRouter';
import UserRouter from '@modules/users/routes/UserRouter';
import SessionRouter from '@modules/users/routes/SessionRouter';
import PasswordRouter from '@modules/users/routes/PasswordRouter';
import ProfileRouter from '@modules/users/routes/ProfileRouter';

const routes = Router();

routes.use('/docs', DocsRouter);
routes.use('/roles', RolesRouter);
routes.use('/users', UserRouter);
routes.use('/sessions', SessionRouter);
routes.use('/password', PasswordRouter);
routes.use('/profile', ProfileRouter);

export default routes;
