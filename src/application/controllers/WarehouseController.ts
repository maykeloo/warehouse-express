import { IWarehouseRepository } from '@/application/interfaces/IWarehouseRepository';
import { CreateWarehouse } from '@/application/use-cases/warehouse/CreateWarehouse';
import { Request, Response } from 'express';

export class WarehouseController {
    private createWarehouse: CreateWarehouse;

    constructor(warehouseRepository: IWarehouseRepository) {
        this.createWarehouse = new CreateWarehouse(warehouseRepository);
    }

    async create(req: Request, res: Response) {
        try {
            const warehouse = req.body;
            const createdWarehouse = await this.createWarehouse.execute(warehouse);
            res.status(200).json(createdWarehouse);
        } catch (error) {
            console.error('Error creating warehouse:', error);
            res.status(400).json({ error });
        }
    }
}
