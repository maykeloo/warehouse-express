import user from '@/infrastructure/routes/user';
import warehouse from '@/infrastructure/routes/warehouse';
import { Router } from 'express';

const router = Router();

router.use('/warehouse', warehouse);
router.use('/user', user);

export default router;
