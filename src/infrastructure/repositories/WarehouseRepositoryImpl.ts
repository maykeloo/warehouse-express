import { IWarehouseRepository } from '@/application/interfaces/IWarehouseRepository';
import { WarehouseEntity } from '@/domain/warehouse/entities/Warehouse';
import { PrismaClient, Warehouse } from '@prisma/client';

export class WarehouseRepositoryImpl implements IWarehouseRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    create(warehouse: WarehouseEntity): Promise<Warehouse> {
        return this.prisma.warehouse.create({
            data: {
                name: warehouse.data.name,
            },
        });
    }

    async findById(id: string): Promise<any> {
        return { id };
    }

    async findByName(name: string): Promise<any> {
        return { name };
    }

    async update(warehouse: any): Promise<any> {
        return warehouse;
    }

    async delete(id: string): Promise<any> {
        return { id };
    }

    findAll(): Promise<Warehouse[]> {
        throw new Error('Method not implemented.');
    }
}
