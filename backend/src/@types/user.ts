import Document from './imports';
export interface UserInterface extends Document {
  firstname?: string;
  lastname?: string;
  nickname?: string;
  email?: string;
  image?: string;
  role: {
    super?: boolean;
    admin?: boolean;
    user?: boolean;
  };
}

export type CreateUserType = {
  email: string;
  nickname: string;
  cohortId: string;
  firstname: string;
  lastname: string;
};

export type UpdateUserType = {
  firstname?: string;
  lastname?: string;
  nickname?: string;
  email?: string;
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
  firstName?: string;
  lastName?: string;
  email?: string;
  nickname?: string;
  userId?: string;
};
