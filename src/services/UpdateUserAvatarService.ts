import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import User from '../models/User';

interface AvatarRequest {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFileName
  }: AvatarRequest): Promise<User | undefined> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Apenas usuários autenticados podem alterar o avatar.');
    }

    if (user.avatar) {
      // deletar o avatar anterior

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }

      user.avatar = avatarFileName;

      await usersRepository.save(user);
    }
    return user;
  }
}

export default UpdateUserAvatarService;
