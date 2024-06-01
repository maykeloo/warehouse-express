export const validateFields = <T extends Record<string, unknown>>(
    fields: string[],
    entity: T,
    nullableFields?: string[],
) => {
    const errors: { field: string; message: string }[] = [];
    fields.forEach((field) => {
        if (!entity[field]) {
            errors.push({ field, message: `${field} is required` });
        }
    });

    if (nullableFields) {
        nullableFields.forEach((field) => {
            if (entity[field] === undefined) {
                errors.push({ field, message: `${field} is required` });
            }
        });
    }

    return errors;
};
