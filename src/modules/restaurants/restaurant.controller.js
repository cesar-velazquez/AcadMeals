import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js"
import { validatePartialUser } from "../users/user.Schema.js";
import { UserService } from "../users/userService.js";
import { RestaurantService } from "./restaurant.service.js";
import { validatePartialRestaurant } from "./restaurantSchema.js";

export const createRestaurant = catchAsync(async (req, res, next) => {
    const { name, address, rating } = req.body;
    if (rating > 5 || rating < 1) {
        return next(new AppError(`Raiting must be max 5 as a 
        good place and min 1 as a place not a goodThe rating should be a maximum of 5 
        as an excellent place and a minimum of 1 as a not so good place.`))
    }
    const restaurant = await RestaurantService.createRestaurant({ name, address, rating })
    return res.status(201).json(restaurant)
})

export const getAllRestaurants = catchAsync(
    async (req, res) => {
        const NewRestaurants = await RestaurantService.GetAllRestaurants();
        return res.status(200).json({
            message: 'Restaurants: ',
            NewRestaurants
        })
    });

export const getOneRestaurant = catchAsync(async (req, res) => {
    const { id } = req.params;

    const NewUser = await RestaurantService.findOneRestaurant(id)

    return res.status(200).json({
        NewUser
    })
})

// Actualizar datos del restaurant
export const updateRestaurant = catchAsync(async (req, res) => {
    const { id } = req.params;

    const { hasError, errorMessages, userData } = validatePartialRestaurant(req.body);

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        });
    }

    const existRestaurant = await RestaurantService.findOneRestaurant(id);

    if (!existRestaurant) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found',
        });
    }

    const updatedRestaurant = await RestaurantService.Update(existRestaurant, userData);


    return res.status(200).json({
        message: 'Info Changed 😉',
        user: { updatedRestaurant },
    });
});

export const deleteRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;    

    await RestaurantService.delete(restaurant);
    return res.status(200).json({
        message: 'User deleted successfully.! 🙂'
    });
})




export const createReview = catchAsync(async (req, res, next) => {
    const { id } = req.params; //ID del restaurant
    const { comment, raiting } = req.body;
    const { sessionUser } = req;
    if (raiting > 5 || raiting < 1) {
        return next(new AppError(`Raiting must be max 5 as a 
        good place and min 1 as a place not a goodThe rating should be a maximum of 5 
        as an excellent place and a minimum of 1 as a not so good place.`))
    }

    const review = await RestaurantService.createReview({
        userId: sessionUser.id,
        comment,
        raiting,
        restaurantId: id
    })
    return res.status(201).json({
        RestaurantId: id,
        userId: review.userId,
        comment: review.comment,
        raiting: review.raiting
    })
})

export const UpdateRevieew = catchAsync(async (req, res) => {
    const { id } = req.params;

    const { hasError, errorMessages, userData } = validatePartialRestaurant(req.body);
    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        });
    }

    const existReview = await RestaurantService.findOneRestaurant(id);    
    if (!existReview) {
        return res.status(404).json({
            status: 'error',
            message: 'Restaurant not found',
        });
    }

    const updateReview = await RestaurantService.updateReview(existReview, userData);

    return res.status(200).json({
        message: 'Info Changed 😉',
        user: updateReview,
    });
});

export const deleteReview = catchAsync(async (req, res, next) => {
    const { review } = req;
    await RestaurantService.delete(review);
    return res.status(204).json({
        message: "Successfully delete"
    })
})

