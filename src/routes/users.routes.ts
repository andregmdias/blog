import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import FindAllUsersService from '../services/FindAllUsersService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import FindUserByIdService from '../services/FindUserByIdService';
import DeleteUserByIdInJwtToken from '../services/DeleteUserByIdInJwtToken';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { displayName, email, password, image } = request.body;
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      displayName,
      email,
      password,
      image,
    });

    return response.json(user);
  } catch (err) {
    return response.status(err.statusCode).json({ message: err.message });
  }
});

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const findAllUsers = new FindAllUsersService();
  try {
    const users = await findAllUsers.execute();
    return response.status(200).json(users);
  } catch (err) {
    return response.status(err.statusCode).json({ message: err.message });
  }
});

usersRouter.get('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const findUserByIdService = new FindUserByIdService();
  try {
    const user = await findUserByIdService.execute((id as unknown) as number);
    return response.status(200).json(user);
  } catch (err) {
    return response.status(err.statusCode).json({ message: err.message });
  }
});

usersRouter.delete('/me', ensureAuthenticated, async (request, response) => {
  try {
    const { id } = request.user;
    const deleteUser = new DeleteUserByIdInJwtToken();
    const result = await deleteUser.execute(id);

    return response.status(204).json(result);
  } catch (err) {
    return response.status(err.status).json({ message: err.message });
  }
});

export default usersRouter;
