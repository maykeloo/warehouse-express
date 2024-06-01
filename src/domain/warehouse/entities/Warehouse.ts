import { validateFields } from '@/shared/utils/validateFields';
import { Warehouse } from '@prisma/client';

export class WarehouseEntity {
    private warehouse: Warehouse;
    
    constructor(warehouse: Warehouse) {
        this.warehouse = warehouse;
    }

    static validate(warehouse: Warehouse) {
        const requiredFields = ['name'];
        const errors = validateFields(requiredFields, warehouse);
        if (errors.length) {
            throw errors;
        }
        return new WarehouseEntity(warehouse);
    }

    get data() {
        return this.warehouse;
    }
}
