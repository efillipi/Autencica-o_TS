import 'reflect-metadata';
import '@shared/database/typeorm';
import '@shared/Container';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import routes from '@shared/routes/index';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use((_request: Request, _response: Response, _next: NextFunction) => {
  throw new AppError('Rota invalida', 404);
});

app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'Error',
        message: err.message,
      });
    }

    console.error('err : ', err);

    return response.status(500).json({
      status: 'Error',
      message: `Interna Server Error ${err.message}`,
    });
  },
);

export default app;
