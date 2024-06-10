import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }

  if (err instanceof MongooseError) {
    res.status(400).json({
      status: 400,
      message: 'Mongoose error',
      data: {
        message: err.data,
      },
    });
    return;
  }

  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
};
