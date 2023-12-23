import { Request, Response, NextFunction } from 'express';
import { ResponseCode, StatusCode } from '../@types';
import { livekitValidations } from '../validations';

const LivekitMiddleware = {
  async inspectGetLivekitToken(req: Request, res: Response, next: NextFunction) {
    try {
      await livekitValidations.validateGetLivekitToken(req.body);
      next();
    } catch (error: any) {
      return res.status(error.statusCode || StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: error,
      });
    }
  },
  async inspectCreateRoom(req: Request, res: Response, next: NextFunction) {
    try {
      await livekitValidations.validateCreateRoom(req.body);
      next();
    } catch (error: any) {
      console.log(error, 'validation error');
      return res.status(error.statusCode || StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: error,
      });
    }
  },
};

export default LivekitMiddleware;
