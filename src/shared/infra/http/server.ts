import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import '@shared/infra/typeorm';
import '@shared/container';
import AppError from '@shared/errors/AppError';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// middleware de tratativa de erros
app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    // erro originado pela aplicação
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error.'
    });
  }
);

app.listen(3333, () => {
  console.log('💇 Server started on port 3333');
});
