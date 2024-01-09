import { Request, Response, NextFunction } from 'express';
import { ResponseCode, StatusCode } from '../@types';
import { userValidations } from '../validations';
import axios from 'axios';

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
  async inspectUser(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const accessToken = token?.split(' ')[1];
      const response = await axios.get('https://web3bridgeauth.onrender.com/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(response.data, ': response data')
      res.locals.user = response.data;
      next();
    } catch (error: any) {
      console.log(error)
      return res.status(error.statusCode || StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: error,
      });
    }
  },
};

export default UserMiddleware;
