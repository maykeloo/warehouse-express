import { WarehousemanController } from '@/application/controllers/WarehousemanController';
import { WarehousemanRepositoryImpl } from '@/infrastructure/repositories/WarehousemanRepositoryImpl';
import express from 'express';
import { prisma } from '~/server';

const router = express.Router();

const warehousemanRepository = new WarehousemanRepositoryImpl(prisma);
const warehousemanController = new WarehousemanController(warehousemanRepository);

router.post('/', (req, res) => warehousemanController.create(req, res));

export default router;
