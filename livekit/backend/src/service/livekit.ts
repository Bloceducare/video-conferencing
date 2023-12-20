import { StatusCode, GetLivekitTokenType, createRoomType } from '../@types';
import { ApiError } from '../utils';
import { getAccessToken, roomService } from '../config';

class LivekitService {
  async getLivekitAccessToken(data: GetLivekitTokenType) {
    try {
      const { roomName, userId } = data;
      const at = getAccessToken(userId);
      at.addGrant({ roomJoin: true, room: roomName });
      return at.toJwt();
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'createUser',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createRoom(data: createRoomType) {
    const { roomName, emptyTimeout, maxParticipants } = data;
    try {
      const room = await roomService()?.createRoom({ name: roomName, emptyTimeout: emptyTimeout ? emptyTimeout * 60 : 60 * 60, maxParticipants: maxParticipants || 100 });
      console.log(room)
      return room;
    } catch (error) {
      console.log(error, 'create room error');
      throw new ApiError(
        'impact api',
        error as string,
        'createRoom',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default new LivekitService();
