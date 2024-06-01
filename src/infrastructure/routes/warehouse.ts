import { WarehouseController } from '@/application/controllers/WarehouseController';
import { WarehouseRepositoryImpl } from '@/infrastructure/repositories/WarehouseRepositoryImpl';
import express from 'express';
import { prisma } from '~/server';

const router = express.Router();

const warehouseRepository = new WarehouseRepositoryImpl(prisma);
const warehouseController = new WarehouseController(warehouseRepository);

router.post('/', (req, res) => warehouseController.create(req, res));

export default router;
