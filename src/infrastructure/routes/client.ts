import express from 'express';
import { prisma } from '~/server';
import { ClientController } from '@/application/controllers/ClientController';
import { ClientRepositoryImpl } from '@/infrastructure/repositories/ClientRepositoryImpl';

const router = express.Router();

const clientRepository = new ClientRepositoryImpl(prisma);
const clientController = new ClientController(clientRepository);

router.post('/register', (req, res) => clientController.register(req, res));

export default router;
