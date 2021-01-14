import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

// garante que toda a rota de appointments seja localhost:3333/appointments
routes.use('/appointments', appointmentsRouter);

export default routes;
