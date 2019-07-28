import { Router } from 'express';
import UserController from './app/controllers/UserController';
import 'express-group-routes';

const routes = new Router();

routes.group('/holidayextras/v1', router => {
  router.get('/users', UserController.index);
  router.get('/user/:id', UserController.show);

  router.post('/user', UserController.store);
  router.put('/user/:id', UserController.update);
  router.delete('/user/:id', UserController.delete);
});
export default routes;
