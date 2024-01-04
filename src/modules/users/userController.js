import { catchAsync } from '../../common/errors/catchAsync.js';
import { verifyPassword } from '../../config/plugins/encripted-password.plugin.js';
import { generateJWT } from '../../config/plugins/generate-jwt.plugin.js';
import { UserService } from './userService.js';
import { AppError } from '../../common/errors/appError.js'
import { validatePartialUser, validateUser } from './user.Schema.js';
import { mealOrderService } from '../orders/orderService.js';
import Meal from '../meals/meal.model.js';
import User from './user.model.js';
import Restaurant from '../restaurants/restaurant.model.js';
import Order from '../orders/order.model.js';

// Crear Usuario
export const createUser = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, userData } = validateUser(req.body);


    if (hasError) {
        return res.status(422).json({
            status: 'error',
            messge: errorMessages,
        });
    }

    const { name, email, password, role } = req.body;
    const user = await UserService.create(userData)
    const token = await generateJWT(user.id)
    return res.status(201).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
})

// Hacemos el login
export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    const user = await UserService.findOneByEmail(email)

    if (!user) {
        return next(new AppError(`User not found`, 404))
    }

    const isOkPassword = await verifyPassword(password, user.password);

    if (!isOkPassword) {
        return next(new AppError('Invalid credentials', 401))
    }

    const token = await generateJWT(user.id)

    return res.status(200).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
})

//VER todos los usuarios
export const findAll = catchAsync(
    async (req, res) => {
        const NewUser = await UserService.GetAll();
        return res.status(200).json({
            message: 'Users: ',
            NewUser
        })
    });

//Ver un usuario:
export const GetOne = catchAsync(async (req, res) => {
    const { id } = req.params;
    const GetOneUser = await UserService.GetOne(id)

    if (!GetOneUser) {
        return res.status(404).json({
            message: `The id: ${id} is not found, maybe has been deleted or not exist`
        })
    }

    return res.status(200).json({
        GetOneUser
    })
})

// Actualizar el perfil
export const updateProfile = catchAsync(async (req, res) => {
    const { id } = req.params;
    // const { user } = req;
    const { hasError, errorMessages, userData } = validatePartialUser(req.body);

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        });
    }

    const existingUser = await UserService.GetOne(id);

    if (!existingUser) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found',
        });
    }

    try {
        const updatedUser = await UserService.Update(existingUser, userData);

        return res.status(200).json({
            message: 'Info Changed 😉',
            user: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
});



// Borrar Usuario
export const deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req;
    await UserService.delete(user);
    return res.status(200).json({
        message: 'User deleted successfully.! 🙂'
    });
})




export const findOneOrderById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const orderDetailById = await Order.findByPk(id);

    if (!orderDetailById) {
        return res.status(404).json({
            status: 'fail',
            message: `Order with id ${id} not found.`,
        });
    }

    const meal = await Meal.findByPk(orderDetailById.mealId, { include: Restaurant });
    const user = await User.findByPk(orderDetailById.userId);
    const restaurant = await Restaurant.findByPk(meal.restaurantId);

    const orderDetails = {
        id: orderDetailById.id,
        nameUser: user ? user.name : null,
        UserNumber: orderDetailById.userId,
        foodName: meal ? meal.name : null,
        quantity: orderDetailById.quantity,
        pricePiece: meal ? meal.price : null,
        totalPrice: orderDetailById.quantity * (meal ? meal.price : 0),
        restaurantId: meal ? meal.restaurantId : null,
        nameRestaurant: restaurant ? restaurant.name : null,
    };

    return res.status(200).json({
        message: 'Order By Id: ',
        order: orderDetails,
    });
});
