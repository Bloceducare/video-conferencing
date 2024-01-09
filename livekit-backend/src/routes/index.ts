import { Router } from 'express';
import user from './user';
import livekit from './livekit';
import { UserMiddleware } from '../middleware';

const router = Router();

const { inspectUser } = UserMiddleware;

router.use('/user', inspectUser, user);
router.use('/livekit', livekit);

export default router;
