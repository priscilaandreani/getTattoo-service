import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUserRepository from '../repositories/IUserRepository';

interface AvatarRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

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
      await this.storageProvider.deleteFile(user.avatar);
      // seta o novo avatar

      const fileName = await this.storageProvider.saveFile(avatarFileName);

      user.avatar = fileName;

      await this.usersRepository.save(user);
    }
    return user;
  }
}

export default UpdateUserAvatarService;
