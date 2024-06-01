import { validateFields } from '@/shared/utils/validateFields';
import { Warehouseman } from '@prisma/client';

export class WarehousemanEntity {
    private readonly warehouseman: Warehouseman;

    constructor(warehouseman: Warehouseman) {
        this.warehouseman = warehouseman;
    }

    static validate(warehouseman: Warehouseman) {
        const requiredFields = ['name', 'email', 'password'];
        const errors = validateFields(requiredFields, warehouseman);
        if (errors.length) {
            throw errors;
        }
        return new WarehousemanEntity(warehouseman);
    }

    get data() {
        return this.warehouseman;
    }
}
