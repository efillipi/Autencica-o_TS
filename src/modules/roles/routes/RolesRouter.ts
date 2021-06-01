import { Router } from 'express';
import ensureAuth from '@shared/middlewares/ensureAuth';

import CreateRoleController from '@modules/roles/useCases/CreateRole/CreateRoleController';
import UpdateRoleController from '@modules/roles/useCases/UpdateRole/UpdateRoleController';
import FindByRoleController from '@modules/roles/useCases/FindByRole/FindByRoleController';
import ShowRolesController from '@modules/roles/useCases/ShowRoles/ShowRolesController';
import DeleteRoleController from '@modules/roles/useCases/DeleteRole/DeleteRoleController';

const RolesRouter = Router();

const createRoleController = new CreateRoleController();
const updateRoleController = new UpdateRoleController();
const findByRoleController = new FindByRoleController();
const showRolesController = new ShowRolesController();
const deleteRoleController = new DeleteRoleController();

RolesRouter.use(ensureAuth(['ADM']));

RolesRouter.get('/', showRolesController.execute);
RolesRouter.post('/', createRoleController.execute);
RolesRouter.get('/:id', findByRoleController.execute);
RolesRouter.put('/:id', updateRoleController.execute);
RolesRouter.delete('/:id', deleteRoleController.execute);

export default RolesRouter;
