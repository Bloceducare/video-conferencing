import joi from './imports';

const user = {
  async validateUpdateUser(payload: any) {
    const schema = joi.object({
      nickname: joi.string().required().label('nickname is required'),
      firstname: joi.string().optional().label('Firstname is required'),
      lastname: joi.string().optional().label('Lastname is required'),
      email: joi.string().email().required().label('Email is required'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
};

export default user;
