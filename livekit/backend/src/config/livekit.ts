import { AccessToken, RoomServiceClient, Room } from 'livekit-server-sdk';
import { env } from '../config';

const { LK_API_KEY, LK_API_SECRET, LK_HOST } = env;

export const getAccessToken = (participantName: string) => {
  return new AccessToken(LK_API_KEY, LK_API_SECRET, {
    identity: participantName,
  });
 }

 const livekitHost = LK_HOST || 'http://localhost:7880';

 export const roomService = () => {
  try {
    return new RoomServiceClient(livekitHost, LK_API_KEY, LK_API_SECRET);
  } catch (error) {
    console.log(error, 'livekit room error');
  }
 };