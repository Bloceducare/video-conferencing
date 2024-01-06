import { Request, Response, NextFunction } from 'express';
import { ResponseCode, StatusCode } from '../@types';
import { userValidations } from '../validations';

const UserMiddleware = {
  async inspectUpdateUser(req: Request, res: Response, next: NextFunction) {
    try {
      await userValidations.validateUpdateUser(req.body);
      next();
    } catch (error: any) {
      return res.status(error.statusCode || StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: error,
      });
    }
  },
};

export default UserMiddleware;
