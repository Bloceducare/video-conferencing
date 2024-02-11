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

  async validateUpdateParticipant(payload: any) {
    const schema = joi.object({
      metadata: joi.string().optional().label('invalid metadata. it should be a json string.'),
      permissions: joi
        .object({
          canPublish: joi.boolean().label('entry for canPublish is invalid'),
          canSubscribe: joi.boolean().label('entry for canSubscribe is invalid'),
          canPublishData: joi.boolean().label('entry for canPublishData is invalid'),
        })
        .optional(),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },

  async validateRecordMeeting(payload: any) {
    const schema = joi.object({
      roomName: joi.string().required().label('valid room name is required'),
      start: joi.boolean().required().label('valid start query is required'),
      egressID: joi.string().label('egressID is not valid'),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
};

export default livekit;
