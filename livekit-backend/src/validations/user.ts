import joi from './imports';

const user = {
  async validateCreateUser(payload: any) {
    const schema = joi.object({
      fullname: joi.string().required().label('fullname is required.'),
      email: joi.string().email().required().label('enter a valid email string.'),
      password: joi.string().required().label('password is required.'),
      cohortId: joi.string().required().label('cohortId is required.'),
      classId: joi.string().required().label('classId is required.'),
      username: joi.string().required().label('username is required.'),
    });

    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },

  async validateUpdateUser(payload: any) {
    const schema = joi.object({
      fullname: joi.string().label('enter a valid name string'),
      cohortId: joi.string().label('cohortId is required.'),
      classId: joi.string().label('classId is required.'),
      username: joi.string().label('username is required.'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
  async validateRegisterUserSocial(payload: any) {
    const schema = joi.object({
      image: joi.string().required().label('image is required.'),
      email: joi.string().email().required().label('enter a valid email string.'),
    });

    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },

  async validateLogin(payload: any) {
    const schema = joi.object({
      email: joi.string().email().required().label('enter a valid email string.'),
      password: joi.string().required().label('password is required.'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
};

export default user;
