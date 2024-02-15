import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { ResponseCode } from '../@types';
import { StatusCode, Toolbox } from '../utils';

const { verifyToken, checkToken } = Toolbox;

const Authentications = {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.method === 'GET') return next();
      const tokenString = await checkToken(req);
      if (!tokenString)
        return res.status(StatusCode.UNAUTHORIZED).json({
          status: !!ResponseCode.FAILURE,
          message: 'Invalid token string',
        });
      const decoded: any = await verifyToken(tokenString);
      const user = await User.findOne({ email: decoded.email }).exec();

      if (!decoded || !user)
        return res.status(StatusCode.UNAUTHORIZED).json({
          status: !!ResponseCode.FAILURE,
          message: 'Invalid token',
        });

      res.locals.user = user;
      next();
    } catch (error: any) {
      return res.status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
        status: !!ResponseCode.FAILURE,
        message: error.message,
      });
    }
  },

  authorize(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = res.locals.user;
        if (!user)
          return res.status(StatusCode.UNAUTHORIZED).json({
            status: !!ResponseCode.FAILURE,
            message: 'User not found',
          });
        const userRoles: string[] = Object.keys(user.role);
        const filteredRoles = userRoles.filter((role) => user.role[role] === true);
        const hasRole = roles.some((role) => filteredRoles.includes(role));

        if (!hasRole)
          return res.status(StatusCode.UNAUTHORIZED).json({
            status: !!ResponseCode.FAILURE,
            message: 'Not authorized',
          });
        next();
      } catch (error: any) {
        return res.status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
          status: !!ResponseCode.FAILURE,
          message: error.message,
          data: null,
        });
      }
    };
  },
};

export default Authentications;
