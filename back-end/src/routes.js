import { Router } from 'express';
import authMiddleware from './app/middlweares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TaskControllers from './app/controllers/TaskControllers';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/tasks', TaskControllers.store);
routes.get('/tasks', TaskControllers.index);
routes.put('/tasks/:task_id', TaskControllers.update);
routes.delete('/tasks/:task_id', TaskControllers.delete);

export default routes;