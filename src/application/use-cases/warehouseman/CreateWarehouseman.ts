import { IWarehousemanRepository } from '@/application/interfaces/IWarehousemanRepository';
import { WarehousemanEntity } from '@/domain/warehouseman/entities/Warehouseman';
import { Warehouseman } from '@prisma/client';

export class CreateWarehouseman {
    constructor(private warehousemanRepository: IWarehousemanRepository) {}

    async execute(warehouseman: Warehouseman) {
        const warehousemanEntity = WarehousemanEntity.validate(warehouseman);
        return await this.warehousemanRepository.create(warehousemanEntity);
    }
}
