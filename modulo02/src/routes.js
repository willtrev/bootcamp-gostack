import { Router } from 'express';
import User from './app/model/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Diego Fernandes',
    email: 'diego@rocketseat.com.br',
    password_hash: '123456789',
  });

  return res.json(user);
});

export default routes;
