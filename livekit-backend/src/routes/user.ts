import { Router } from 'express';
import { getUser, updateUser, uploadImage, listUsers } from '../controller';
import { UserMiddleware, UploadsMiddleware } from '../middleware';

const router = Router();
const { inspectUpdateUser } = UserMiddleware;

router.post('/logout');
router.post('/refresh');
router.put('/:userId/upload', UploadsMiddleware.single('image'), uploadImage);
router.get('/:userId', getUser);
router.get('/', listUsers);
router.put('/:userId', [inspectUpdateUser], updateUser);

export default router;
