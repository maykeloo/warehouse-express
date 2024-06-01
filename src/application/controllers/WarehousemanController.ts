import { IWarehousemanRepository } from '@/application/interfaces/IWarehousemanRepository';
import { CreateWarehouseman } from '@/application/use-cases/warehouseman/CreateWarehouseman';
import { Request, Response } from 'express';

export class WarehousemanController {
    private createWarehouseman: CreateWarehouseman;

    constructor(warehousemanRepository: IWarehousemanRepository) {
        this.createWarehouseman = new CreateWarehouseman(warehousemanRepository);
    }

    async create(req: Request, res: Response) {
        try {
            const warehouseman = req.body;
            const createdWarehouseman = await this.createWarehouseman.execute(warehouseman);
            res.status(201).json(createdWarehouseman);
        } catch (error) {
            console.error('Error creating warehouseman:', error);
            res.status(400).json({ error });
        }
    }
}
