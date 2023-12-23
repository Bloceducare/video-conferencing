import joi from './imports';

const livekit = {
  async validateGetLivekitToken(payload: any) {
    const schema = joi.object({
      userId: joi.string().required().label('userId is required'),
      roomName: joi.string().required().label('room is required'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
  async validateCreateRoom(payload: any) {
    const schema = joi.object({
      roomName: joi.string().required().label('room is required'),
      emptyTimeout: joi.number().integer().optional().label('invalid emptyTimeout'),
      maxParticipants: joi.number().integer().optional().label('invalid maxParticipants'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
};

export default livekit;
