import { StatusCode, GetLivekitTokenType, CreateRoomType, UpdateParticipantType } from '../@types';
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
        'livekit api',
        error as string,
        'createUser',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createRoom(data: CreateRoomType) {
    const { roomName, emptyTimeout, maxParticipants } = data;
    try {
      const room = await roomService()?.createRoom({
        name: roomName,
        emptyTimeout: emptyTimeout ? emptyTimeout * 60 : 60 * 60,
        maxParticipants: maxParticipants || 100,
      });
      console.log(room);
      return room;
    } catch (error) {
      console.log(error, 'create room error');
      throw new ApiError(
        'livekit api',
        error as string,
        'createRoom',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async listRooms(names?: string[]) {
    try {
      const rooms = await roomService()?.listRooms(names);
      return rooms;
    } catch (error) {
      console.log(error, 'list room error');
      throw new ApiError(
        'livekit api',
        error as string,
        'listRooms',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteRoom(roomName: string) {
    try {
      await roomService()?.deleteRoom(roomName);
      return true;
    } catch (error) {
      console.log(error, 'delete room error');
      throw new ApiError(
        'livekit api',
        error as string,
        'deleteRoom',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async listParticipants(roomName: string) {
    try {
      const participants = await roomService()?.listParticipants(roomName);
      return participants;
    } catch (error) {
      console.log(error, 'list participants error');
      throw new ApiError(
        'livekit api',
        error as string,
        'listParticipants',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getParticipant(roomName: string, userId: string) {
    try {
      const participant = await roomService()?.getParticipant(roomName, userId);
      return participant;
    } catch (error) {
      console.log(error, 'get participant error');
      return false;
    }
  }

  async updateParticipant(roomName: string, userId: string, payload: UpdateParticipantType) {
    try {
      await roomService()?.updateParticipant(
        roomName,
        userId,
        payload.metadata,
        payload.permissions
      );
      return true;
    } catch (error) {
      console.log(error, 'update participant error');
      throw new ApiError(
        'livekit api',
        error as string,
        'updateParticipant',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removeParticipant(roomName: string, userId: string) {
    try {
      await roomService()?.removeParticipant(roomName, userId);
      return true;
    } catch (error) {
      console.log(error, 'remove participant error');
      throw new ApiError(
        'livekit api',
        error as string,
        'removeParticipant',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async muteParticipant(roomName: string, userId: string, trackSID: string, isMute: boolean) {
    try {
      await roomService()?.mutePublishedTrack(roomName, userId, trackSID, isMute);
      return true;
    } catch (error) {
      console.log(error, 'mute participant error');
      return false;
    }
  }
}

export default new LivekitService();
