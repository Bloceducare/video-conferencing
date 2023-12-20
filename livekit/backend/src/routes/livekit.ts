import { Router } from 'express';
import { getLiveKitAccessToken, createRoom } from '../controller';
import { LivekitMiddleware } from '../middleware';

const router = Router();
const { inspectGetLivekitToken, inspectCreateRoom } = LivekitMiddleware;

router.post('/token', inspectGetLivekitToken, getLiveKitAccessToken);
router.post('/room', inspectCreateRoom, createRoom);

export default router;
