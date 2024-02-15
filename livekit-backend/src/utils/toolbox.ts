import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import { env } from '../config';
import { UserQueryType } from '../@types/user';
import bcrypt from 'bcryptjs';

const { NODE_ENV, JWT_SECRET } = env;

/**
 * Function for api tools methods
 * @function Toolbox
 */
const Tools = {
  encryptPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  comparePasswords(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  },

  createToken(payload: object, expiresIn: string = '5m'): string {
    return jwt.sign(payload, JWT_SECRET as string, { expiresIn });
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
      const response = jwt.verify(token, JWT_SECRET as string);
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

    if (data.email) query.email = data.email;

    if (data.username) query.username = data.username;

    return query;
  },
};

export default Tools;
