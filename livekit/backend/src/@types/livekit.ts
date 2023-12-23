export type GetLivekitTokenType = {
 roomName: string;
 userId: string;
}

export type createRoomType = {
  roomName: string;
  emptyTimeout?: number;
  maxParticipants?: number;
}