import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { validatePartialUser } from "../users/user.Schema.js";
import { mealService } from "./meal.Service.js";
import { validateMeal } from "./mealSchema.js";

export const createMeal = catchAsync(async (req, res, next) => {
    const { name, price } = req.body;
    const restaurantId = req.params.RestaurantId;
    const meal = await mealService.createMeal({ name, price, restaurantId })
    return res.status(201).json(meal)
})

export const getAllMeals = catchAsync(async (req, res, next) => {
    const NewMeall = await mealService.GetAll();
    return res.status(200).json({
        message: 'Meals',
        NewMeall
    })
});

export const getOneMeal = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const Meall = await mealService.GetOne(id)
    if (!Meall) {
        return next(new AppError(`The id: ${id} not found`))
    }
    
    return res.status(200).json({
        Meall
    })
})

export const updateMeal = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    
    const { hasError, errorMessages, userData } = validateMeal(req.body)
    
    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        });
    }

    const existMeal = await mealService.GetOne(id);

    if (!existMeal) {
        return res.status(404).json({
            status: 'error',
            message: 'Meal not found',
        });
    }
    const update = await mealService.Update(existMeal, userData);

    return res.status(200).json({
        message: 'Info changed 🤗',
        meal: update,
    })
})

export const deleteMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;
    const { id } = req.params;

    if (!meal) {
        return res.status(404).json({
            message: 'Meal not found.'
        });
    }

    
    await mealService.delete(meal);
    return res.status(200).json({
        message: 'Meal deleted successfully.! 🙂'
    });
})
