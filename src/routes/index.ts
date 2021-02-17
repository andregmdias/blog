import { Router } from 'express';
import postRouter from './postBlog.routes';
import usersRouter from './users.routes';
import loginRouter from './login.routes';

const routes = Router();

routes.use('/post', postRouter);
routes.use('/user', usersRouter);
routes.use('/login', loginRouter);

export default routes;
