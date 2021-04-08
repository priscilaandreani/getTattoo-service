import { Router } from 'express';
import AuthtenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthtenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password
  });
});

export default sessionsRouter;
