import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/iAppointmentsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRespository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
);

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository
);
