import { Router } from 'express';
import warehouse from '@/infrastructure/routes/warehouse';
import warehouseman from '@/infrastructure/routes/warehouseman';
import client from '@/infrastructure/routes/client';
import user from '@/infrastructure/routes/user';

const router = Router();

router.use('/warehouseman', warehouseman);
router.use('/warehouse', warehouse);
router.use('/client', client);
router.use('/user', user);

export default router;
