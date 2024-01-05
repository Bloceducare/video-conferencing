export type GetLivekitTokenType = {
  roomName: string;
  userId: string;
};

export type CreateRoomType = {
  roomName: string;
  emptyTimeout?: number;
  maxParticipants?: number;
};

export type UpdateParticipantType = {
  metadata?: string; // this should be a json string of user metadata
  permissions?: {
    canPublish: boolean;
    canSubscribe: boolean;
    canPublishData: boolean;
  };
};
