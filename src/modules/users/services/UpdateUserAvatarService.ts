/* eslint-disable camelcase */
import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface AvatarRequest {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({
    user_id,
    avatarFileName
  }: AvatarRequest): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated user can change avatar.', 401);
    }

    if (user.avatar) {
      // deletar o avatar anterior

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }

      // seta o novo avatar

      user.avatar = avatarFileName;

      await this.usersRepository.save(user);
    }
    return user;
  }
}

export default UpdateUserAvatarService;
