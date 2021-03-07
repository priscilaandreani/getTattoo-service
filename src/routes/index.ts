import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

// garante que toda a rota de appointments seja localhost:3333/appointments
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
