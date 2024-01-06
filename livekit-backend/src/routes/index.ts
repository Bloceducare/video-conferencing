import { Router } from 'express';
import user from './user';
import livekit from './livekit';

const router = Router();

router.use('/user', user);
router.use('/livekit', livekit);

export default router;
