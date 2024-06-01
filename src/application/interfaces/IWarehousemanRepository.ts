import { WarehousemanEntity } from '@/domain/warehouseman/entities/Warehouseman';

export interface IWarehousemanRepository {
    create(warehouseman: WarehousemanEntity): Promise<any>;

    findById(id: string): Promise<any>;

    findByName(name: string): Promise<any>;

    findByEmail(email: string): Promise<any>;

    update(warehouseman: any): Promise<any>;

    delete(id: string): Promise<any>;
}
