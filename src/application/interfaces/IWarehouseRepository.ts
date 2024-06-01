import { WarehouseEntity } from '@/domain/warehouse/entities/Warehouse';
import { Warehouse } from '@prisma/client';

export interface IWarehouseRepository {
    create(warehouse: WarehouseEntity): Promise<Warehouse>;

    update(warehouse: WarehouseEntity): Promise<Warehouse>;

    delete(id: string): Promise<void>;

    findById(id: string): Promise<Warehouse>;

    findAll(): Promise<Warehouse[]>;
}
