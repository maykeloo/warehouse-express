import express from 'express';
import { prisma } from '~/server';
import { UserRepositoryImpl } from '@/infrastructure/repositories/UserRepositoryImpl';
import { AuthController } from '@/application/controllers/AuthController';

const router = express.Router();

const userRepository = new UserRepositoryImpl(prisma);
const userController = new AuthController(userRepository);

router.post('/login', (req, res) => userController.login(req, res));
router.get('/data', (req, res) => userController.getData(req, res));

export default router;
