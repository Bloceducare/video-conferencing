import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import { env } from '../config';
import { UserQueryType } from '../@types/user';

const { NODE_ENV, SECRET } = env;

/**
 * Function for api tools methods
 * @function Toolbox
 */
const Tools = {
  createToken(payload: object, expiresIn: string = '5m'): string {
    return jwt.sign(payload, SECRET as string, { expiresIn });
  },

  async checkToken(req: Request) {
    const {
      headers: { authorization },
      cookies: { token: cookieToken },
    } = req;
    let apiToken = '',
      bearerToken = '';
    if (authorization) {
      if (authorization.split(' ')[0] === 'Bearer')
        bearerToken = authorization.split(' ')[1] ? authorization.split(' ')[1] : authorization;
    }
    return (
      apiToken ||
      cookieToken ||
      bearerToken ||
      req.headers['x-access-token'] ||
      req.headers.token ||
      req.body.token
    );
  },

  async verifyToken(token: string): Promise<string | JwtPayload | boolean> {
    try {
      const response = jwt.verify(token, SECRET as string);
      return response;
    } catch (err) {
      return false;
    }
  },

  generateOTP(): number {
    return Math.floor(100000 + Math.random() * 900000);
  },

  createQuery(query: any, data: UserQueryType): any {
    if (data.role) query['role.' + data.role] = true;

    if (data.firstName) query.firstName = data.firstName;

    if (data.email) query.email = data.email;

    if (data.lastName) query.lastName = data.lastName;

    if (data.nickname) query.nickname = data.nickname;

    return query;
  },
};

export default Tools;
