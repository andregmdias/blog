import { Router } from 'express';

import AuthenticateUserService from '../services/LoginUserService';

const loginRouter = Router();

loginRouter.post('/', async (request, response) => {
  try {
    const authService = new AuthenticateUserService();

    const { email, password } = request.body;

    const { token } = await authService.execute({
      email,
      password,
    });

    return response.json({ token });
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default loginRouter;
