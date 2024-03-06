import Document from './imports';

export interface UserInterface extends Document {
  email: string;
  username?: string;
  fullname?: string;
  cohortId?: string;
  classId?: string;
  token?: string;
  image?: string;
  password?: string;
  signupType?: {
    social?: boolean;
    email?: boolean;
  };
  role?: {
    super?: boolean;
    admin?: boolean;
    user?: boolean;
    student?: boolean;
  };
}

export type CreateUserType = {
  email: string;
  username?: string;
  fullname?: string;
  cohortId?: string;
  classId?: string;
  token?: string;
  image?: string;
  password?: string;
  signupType?: {
    social?: boolean;
    email?: boolean
  };
};

export type UpdateUserType = {
  email?: string;
  username?: string;
  fullname?: string;
  cohortId?: string;
  classId?: string;
  password?: string;
  image?: string;
  role?: {
    super?: boolean;
    admin?: boolean;
    user?: boolean;
    student?: boolean;
  };
};

export type UserQueryType = {
  role?: string;
  page?: number;
  limit?: number;
  email?: string;
  username?: string;
  userId?: string;
};
