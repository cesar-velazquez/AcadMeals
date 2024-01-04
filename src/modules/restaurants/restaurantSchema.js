import z from 'zod';
import { extractValidationData } from '../../common/Utils/extractErrorData.js';

const registerSchemaRestaurant = z.object({
    userId: z
        .number({
            invalid_type_error: 'userId must be a number',
            required_error: 'userId is required',
        }),
    name: z
        .string({
            invalid_type_error: 'comment must be a string',
            required_error: 'comment is required',
        })
        .min(3, { message: 'comment is too short, please write more' })
        .max(50, { message: 'comment is too long' }),
    address: z
        .string({
            invalid_type_error: 'comment must be a string',
            required_error: 'comment is required',
        })
        .min(3, { message: 'comment is too short, please write more' })
        .max(50, { message: 'comment is too long' }),
    comment: z
        .string({
            invalid_type_error: 'comment must be a string',
            required_error: 'comment is required',
        })
        .min(3, { message: 'comment is too short, please write more' })
        .max(50, { message: 'comment is too long' }),

    restaurantId: z
        .number({
            invalid_type_error: 'restaurantId must be a number',
            required_error: 'restaurantId is required',
        }),

    rating: z
        .number({
            invalid_type_error: 'rating must be an integer between 1 and 5',
            required_error: 'rating is required',
        })
        .refine((value) => value >= 1 && value <= 5, {
            message: 'rating must be an integer between 1 and 5',
        }),

    role: z.enum(['normal', 'admin']),
});

export function validateUser(data) {
    const result = registerSchemaRestaurant.safeParse(data);
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

export function validatePartialRestaurant(data) {
    const result = registerSchemaRestaurant.partial().safeParse(data);

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
