import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { mealService } from "../meals/meal.Service.js";
import { mealOrderService } from "./orderService.js";

export const validExistMeal = catchAsync(async (req, res, next) => {
    const id = req.body.mealId;

    const meal = await mealService.GetOne(id);    

    if (!meal) {
        return next(new AppError(`order with id: ${id} of meal not found,
        maybe has been deleted or not exist. Can you check on the table meals`, 404));
    }

    req.meal = meal;
    next();
});

export const ValidateExistOrder = catchAsync(async (req, res, next) => {
    const id = req.params.id    
    const orderToDelete = await mealOrderService.GetOneToDelete(id);

    if (!orderToDelete) {
        return next(new AppError(`order with id: ${id} not found`, 404));
    }

    req.order = orderToDelete;
    next();
})


export const protectAccountOwnerOrder = (req, res, next) => {
    const { sessionUser } = req;

    if (sessionUser.id !== req.order.userId) {
        return next(new AppError('You cannot modify this account, only the owner can 😛', 401));
    }

    next();
};

