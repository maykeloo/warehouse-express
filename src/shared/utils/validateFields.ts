import { ERROR_MESSAGES } from '@/shared/messages';

export const validateFields = <T extends Record<string, unknown>>(
    fields: string[],
    entity: T,
    nullableFields?: string[],
) => {
    const errors: { field: string; message: string }[] = [];
    fields.forEach((field) => {
        if (!entity[field]) {
            errors.push({ field, message: ERROR_MESSAGES.FIELD_IS_REQUIRED });
        }
    });

    if (nullableFields) {
        nullableFields.forEach((field) => {
            if (entity[field] === undefined) {
                errors.push({ field, message: ERROR_MESSAGES.FIELD_IS_REQUIRED });
            }
        });
    }

    return errors;
};
