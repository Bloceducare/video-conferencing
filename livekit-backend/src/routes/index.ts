import { Router } from 'express';
import { AuthMiddleware } from '../middleware';
import user from './user';
import livekit from './livekit';
import auth from './auth';

const router = Router();

const { authenticate } = AuthMiddleware;

router.use('/user', authenticate, user);
router.use('/livekit', authenticate, livekit);
router.use('/auth', auth);

export default router;
