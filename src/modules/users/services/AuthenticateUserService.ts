import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import 'reflect-metadata';
import { getRepository } from 'typeorm';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  email: string;
  password: string;
}

export default class AuthenticateUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({
    email,
    password
  }: Request): Promise<{ user: User; token: string }> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // user.password - Senha criptografada dentro do banco de dados
    // password - Senha que o usuário tentou utilizar (não cripotografada)

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // Usuário autenticado
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    });

    return {
      user,
      token
    };
  }
}
