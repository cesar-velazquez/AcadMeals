import { catchAsync } from "../../common/errors/catchAsync.js";
import { mealService } from "./meal.Service.js";


export const validateExistMeal = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const meal = await mealService.GetOne(id);

    if (!meal) {
        return next(new AppError(`meal with id: ${id} not found`, 404));
    }

    req.meal = meal;    
    next();
});
