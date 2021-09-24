import { startOfHour } from 'date-fns';
import 'reflect-metadata';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '../repositories/iAppointmentsRepository';

/**
 *  Recebe das informações
 *  Trtatativa de erros/excessões
 *  Acesso ao repositório
 */

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({
    date,
    provider_id
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError('Horário já agendado');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    });

    return appointment;
  }
}

export default CreateAppointmentService;
