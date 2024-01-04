import z from 'zod';
import { extractValidationData } from '../../common/Utils/extractErrorData.js';

const registerSchemaMeal = z.object({
    name: z
        .string({
            invalid_type_error: 'Name must be a string',
            required_error: 'Name is required',
        })
        .min(3, { message: 'Name must be at least 3 characters long' })
        .max(40, { message: 'Name must not exceed 40 characters' }),
    price: z
        .number({
            invalid_type_error: 'Price must be a number',
            required_error: 'Price is required',
            positive_error: 'Price must be a positive number',
        })
        .refine((value) => value >= 0, { message: 'Price must be a positive number' }),
});


export function validateMeal(data) {
    const result = registerSchemaMeal.partial().safeParse(data);

    const {
        hasError,
        errorMessages,
        data: userData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        userData,
    };
}