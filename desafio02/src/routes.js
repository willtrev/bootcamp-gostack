import { Router } from 'express';

import SessionController from './app/controllers/SessionControler';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.put('/students/:index', StudentController.update);

export default routes;
