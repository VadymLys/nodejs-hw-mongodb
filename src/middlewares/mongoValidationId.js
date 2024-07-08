import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

const isValidId =
  (idName = 'id') =>
  (req, res, next) => {
    const id = req.params[idName];
    if (!isValidObjectId(id)) {
      next(createHttpError(404, 'Id is not valid'));
    }

    next();
  };

export default isValidId;
