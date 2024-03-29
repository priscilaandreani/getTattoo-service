import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    });

    const userWithoutPassword = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      created_at: user?.created_at,
      updated_at: user?.updated_at
    };

    return response.json(userWithoutPassword);
  }
}
