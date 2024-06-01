import { IWarehouseRepository } from '@/application/interfaces/IWarehouseRepository';
import { WarehouseEntity } from '@/domain/warehouse/entities/Warehouse';
import { Warehouse } from '@prisma/client';

export class CreateWarehouse {
    constructor(private warehouseRepository: IWarehouseRepository) {}

    async execute(warehouse: Warehouse) {
        const warehouseEntity = WarehouseEntity.validate(warehouse);
        return await this.warehouseRepository.create(warehouseEntity);
    }
}
