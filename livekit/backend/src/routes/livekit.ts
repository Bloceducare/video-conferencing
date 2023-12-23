import { Router } from 'express';
import { getLiveKitAccessToken, createRoom, listRooms } from '../controller';
import { LivekitMiddleware } from '../middleware';

const router = Router();
const { inspectGetLivekitToken, inspectCreateRoom } = LivekitMiddleware;

router.post('/token', inspectGetLivekitToken, getLiveKitAccessToken);
router.post('/room', inspectCreateRoom, createRoom);
router.get('/rooms', listRooms);

export default router;
