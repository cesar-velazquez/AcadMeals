import z from 'zod';
import { extractValidationData } from '../../common/Utils/extractErrorData.js';

const registerSchemaOrder = z.object({
    status: z.enum(['cancelled', 'completed'])
    // mealId: z
    //     .number({
    //         invalid_type_error: 'Price must be a number',
    //         required_error: 'Price is required',
    //         positive_error: 'Price must be a positive number',
    //     })
    //     .refine((value) => value >= 0, { message: 'Price must be a positive number' }),
    // userId: z
    //     .number({
    //         invalid_type_error: 'Price must be a number',
    //         required_error: 'Price is required',
    //         positive_error: 'Price must be a positive number',
    //     })
    //     .refine((value) => value >= 0, { message: 'Price must be a positive number' }),
    // quantity: z
    //     .number({
    //         invalid_type_error: 'Price must be a number',
    //         required_error: 'Price is required',
    //         positive_error: 'Price must be a positive number',
    //     })
    //     .refine((value) => value >= 0, { message: 'Price must be a positive number' }),

})

export function validateOrder(data) {
    const result = registerSchemaOrder.partial().safeParse(data);

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
