import { IWarehousemanRepository } from '@/application/interfaces/IWarehousemanRepository';
import { WarehousemanEntity } from '@/domain/warehouseman/entities/Warehouseman';
import { PrismaClient, Warehouseman } from '@prisma/client';

export class WarehousemanRepositoryImpl implements IWarehousemanRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async create(warehouseman: WarehousemanEntity): Promise<Warehouseman> {
        return this.prisma.warehouseman.create({
            data: {
                email: warehouseman.data.email,
                name: warehouseman.data.name,
                warehouseId: warehouseman.data.warehouseId,
                password: warehouseman.data.password,
            },
        });
    }

    async findById(id: string): Promise<any> {
        return { id };
    }

    async findByName(name: string): Promise<any> {
        return { name };
    }

    async findByEmail(email: string): Promise<any> {
        return { email };
    }

    async update(warehouseman: any): Promise<any> {
        return warehouseman;
    }

    async delete(id: string): Promise<any> {
        return { id };
    }
}
