import { Router } from 'express';
import { getLiveKitAccessToken, createRoom, listRooms, getRoom, deleteRoom, listParticipants, getParticipant, updateParticipant, removeParticipant , muteParticipant } from '../controller';
import { LivekitMiddleware } from '../middleware';

const router = Router();
const { inspectGetLivekitToken, inspectCreateRoom, inspectUpdateParticipant } = LivekitMiddleware;

router.post('/token', inspectGetLivekitToken, getLiveKitAccessToken);
router.post('/room', inspectCreateRoom, createRoom);
router.get('/room', listRooms);
router.get('/room/:roomName', getRoom);
router.delete('/room/:roomName', deleteRoom);
router.get('/participant/:roomName', listParticipants);
router.get('/participant/:roomName/:userId', getParticipant);
router.patch('/participant/:roomName/:userId/:trackSID/:isMute', muteParticipant);
router.put('/participant/:roomName/:userId', inspectUpdateParticipant, updateParticipant);
router.patch('/participant/:roomName/:userId', removeParticipant );

export default router;
