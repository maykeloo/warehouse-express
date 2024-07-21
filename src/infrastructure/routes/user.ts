import { AuthController } from '@/application/controllers/AuthController';
import { UserRepositoryImpl } from '@/infrastructure/repositories/UserRepositoryImpl';
import express from 'express';
import { prisma } from '~/server';

const router = express.Router();

const userRepository = new UserRepositoryImpl(prisma);
const userController = new AuthController(userRepository);

router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.get('/data', (req, res) => userController.getData(req, res));
router.post('/token', (req, res) => userController.refresh(req, res));

export default router;
