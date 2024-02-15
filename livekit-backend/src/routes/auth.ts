import { Router } from 'express';
import { registerUser, registerUserViaSocial, loginUser } from '../controller';
import { UserMiddleware } from '../middleware';

const router = Router();
const { inspectRegisterUser, inspectRegisterUserSocial, inspectLogin } = UserMiddleware;

router.post('/logout');
router.post('/refresh');
router.post('/register', [inspectRegisterUser], registerUser);
router.post('/register-social', [inspectRegisterUserSocial], registerUserViaSocial);
router.post('/login', [inspectLogin], loginUser);

export default router;
