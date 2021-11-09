import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';

interface IResponse {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  public async execute({ email }: IResponse): Promise<void> {
    const checkEmailExists = await this.usersRepository.findByEmail(email);

    if (!checkEmailExists) {
      throw new AppError('User email does not exists');
    }

    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha');
  }
}

export default SendForgotPasswordEmailService;
