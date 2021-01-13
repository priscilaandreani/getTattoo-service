import { Router } from 'express';

const routes = Router();

routes.post('/users', (request, response) => {
  const { nome, email } = request.body;
  const user = {
    nome,
    email,
  };

  return response.json(user);
});

export default routes;
