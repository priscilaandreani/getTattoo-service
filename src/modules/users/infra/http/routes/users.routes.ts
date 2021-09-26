import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersAvatarController = new UsersAvatarController();
const usersController = new UsersController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update
);

export default usersRouter;
