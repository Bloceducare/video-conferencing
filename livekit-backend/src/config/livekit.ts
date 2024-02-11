import { AccessToken, RoomServiceClient, EgressClient, EncodedFileType } from 'livekit-server-sdk';
import { env } from '../config';

const { LK_API_KEY, LK_API_SECRET, LK_HOST, AWS_ACCESS_KEY, AWS_SECRET, AWS_REGION, AWS_BUCKET } = env;

export const egressClient = new EgressClient(
  LK_HOST || 'http://0.0.0.0:7880',
  LK_API_KEY || 'devkey',
  LK_API_SECRET || 'secret'
);

export const egressOutput = {
  fileType: EncodedFileType.MP4,
  s3: {
    accessKey: AWS_ACCESS_KEY,
    secret: AWS_SECRET,
    region: AWS_REGION || 'eu-west-2',
    bucket: AWS_BUCKET
  },
};

export const getAccessToken = (participantName: string) => {
  return new AccessToken(LK_API_KEY, LK_API_SECRET, {
    identity: participantName,
  });
};

const livekitHost = LK_HOST || 'http://localhost:7880';

export const roomService = () => {
  try {
    return new RoomServiceClient(livekitHost, LK_API_KEY, LK_API_SECRET);
  } catch (error) {
    console.log(error, 'livekit room error');
  }
};
