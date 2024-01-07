import { Router } from 'express';
import {
  getLiveKitAccessToken,
  createRoom,
  listRooms,
  getRoom,
  deleteRoom,
  listParticipants,
  getParticipant,
  updateParticipant,
  removeParticipant,
  muteParticipant,
} from '../controller';
import { LivekitMiddleware, UserMiddleware } from '../middleware';

const router = Router();
const { inspectGetLivekitToken, inspectCreateRoom, inspectUpdateParticipant } = LivekitMiddleware;
const { inspectUser } = UserMiddleware;

router.post('/token', inspectUser, inspectGetLivekitToken, getLiveKitAccessToken);
router.post('/room', inspectUser, inspectCreateRoom, createRoom);
router.get('/room', inspectUser, listRooms);
router.get('/room/:roomName', inspectUser, getRoom);
router.delete('/room/:roomName', inspectUser, deleteRoom);
router.get('/participant/:roomName', inspectUser, listParticipants);
router.get('/participant/:roomName/:userId', inspectUser, getParticipant);
router.patch('/participant/:roomName/:userId/:trackSID/:isMute', inspectUser, muteParticipant);
router.put(
  '/participant/:roomName/:userId',
  inspectUser,
  inspectUpdateParticipant,
  updateParticipant
);
router.patch('/participant/:roomName/:userId', inspectUser, removeParticipant);

export default router;
