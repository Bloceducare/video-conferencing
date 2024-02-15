import { Request, Response } from 'express';
import { GenericAnyType, ResponseCode, StatusCode, UserInterface, UserQueryType } from '../@types';
import { UserService } from '../service';
import { Toolbox } from '../utils';

const { encryptPassword, comparePasswords, createToken } = Toolbox;

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email, classId, cohortId, fullname } = req.body;

    const hashedPassword = encryptPassword(password);

    const emailExists = await UserService.getUserByEmail(email);

    if (emailExists) {
      if (emailExists.signupType?.social) {
        return res.status(StatusCode.NOT_FOUND).json({
          status: !!ResponseCode.FAILURE,
          message: 'Email exists. Please use social login to signin',
        });
      }
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'Email already exists. Please signin with password',
      });
    }

    const existingUsername = await UserService.getUserByUsername(username);

    if (existingUsername) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'Username already exists',
      });
    }

    const token = createToken(
      {
        username,
        email,
      },
      '1h'
    );

    const newUser = await UserService.createUser({
      username,
      password: hashedPassword,
      email,
      classId,
      cohortId,
      fullname,
      token,
      signupType: {
        email: true,
      },
    });

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'User created successfully',
      data: {
        token,
        user: newUser,
      },
    });
  } catch (err: GenericAnyType) {
    return res.status(err.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server error',
    });
  }
};

export const registerUserViaSocial = async (req: Request, res: Response) => {
  try {
    const { image, email } = req.body;

    let emailExists = await UserService.getUserByEmail(email);

    if (emailExists) {
      if (emailExists.signupType?.email) {
        return res.status(StatusCode.NOT_FOUND).json({
          status: !!ResponseCode.FAILURE,
          message: 'Email exists. Please use email login to signin',
        });
      }
    }

    const token = createToken(
      {
        image,
        email,
      },
      '1h'
    );

    if (!emailExists) {
      emailExists = await UserService.createUser({
        email,
        token,
        signupType: {
          social: true,
        },
        image,
      });
    }

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'User created successfully',
      data: {
        token,
        user: emailExists,
      },
    });
  } catch (err: GenericAnyType) {
    return res.status(err.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server error',
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = (await UserService.getUserByEmail(email)) as UserInterface;

    if (!user) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'User not found',
      });
    }

    if ('signupType' in user && user.signupType?.social) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'Email exists. Please use social login to signin',
      });
    }

    const match = comparePasswords(password, user.password || '');

    if (!match) {
      return res.status(StatusCode.UNAUTHORIZED).json({
        status: !!ResponseCode.FAILURE,
        message: 'Invalid credentials',
      });
    }

    const token = createToken(
      {
        username: user?.username,
        email: user?.email,
      },
      '1h'
    );

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'User logged in successfully',
      data: {
        token,
        user,
      },
    });
  } catch (err: GenericAnyType) {
    return res.status(err.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server error',
    });
  }
};
