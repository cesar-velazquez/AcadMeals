import { catchAsync } from '../../common/errors/catchAsync.js';
import { mealOrderService } from './orderService.js'
import Meal from '../meals/meal.model.js';
import Restaurant from '../restaurants/restaurant.model.js'
import { validateOrder } from './order.schema.js';
import Order from './order.model.js';
import User from '../users/user.model.js';

export const createOrder = catchAsync(async (req, res, next) => {
    const { mealId, userId, quantity } = req.body;

    const Findmeal = await Meal.findByPk(mealId);

    if (!Findmeal) {
        return res.status(404).json({ message: 'Comida no encontrada' });
    }

    const totalPrice = Findmeal.price * quantity;
    


    const order = await mealOrderService.createOrder({
        mealId,
        userId,
        totalPrice,
        quantity
    })
    
    return res.status(201).json(order)
})

export const getAllOrders = catchAsync(async (req, res, next) => {
    const GetOrders = await mealOrderService.FindAllOrders();

    const ordersAndNames = await Promise.all(GetOrders.map(async (order) => {
        const meal = await Meal.findByPk(order.mealId, { include: Restaurant });
        const user = await User.findByPk(order.userId)
        const restaurant = await Restaurant.findByPk(meal.restaurantId);
        return {
            id: order.id,
            nameUser: user ? user.name : null,
            UserNumber: order.userId,
            foodName: meal ? meal.name : null,
            quantity: order.quantity,
            pricePiece: meal ? meal.price : null,
            totalPrice: order.quantity * (meal ? meal.price : 0),
            restaurantId: meal ? meal.restaurantId : null,
            nameRestaurant: restaurant ? restaurant.name : null,
            status: order.status,
        };
    }))

    return res.status(200).json({
        message: 'Orders',
        orders: ordersAndNames,
    })
});

export const getOneOrder = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const Order = await mealOrderService.GetOne(id)

    if (!Order) {
        return res.status(404).json({
            message: `Order with the id: ${id} not found`
        })
    }

    return res.status(200).json({
        Order
    })
})

export const updateOrder = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { hasError, errorMessages, userData } = validateOrder(req.body);
    
    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        });
    }

    const findStatus = await Order.findByPk(id);

    if (!findStatus) {
        return res.status(404).json({ message: 'Order not found!' });
    }

    const statusCurrent = findStatus.status;

    if (statusCurrent != 'active') {
        return res.status(404).json({ message: 'This order can´t it modified ' })
    }

    const existOrder = await mealOrderService.GetOne(id);
    if (!existOrder) {
        return res.status(404).json({
            status: 'error',
            message: 'Order not Found!'
        });
    }
    const update = await mealOrderService.Update(existOrder, userData);    

    return res.status(200).json({
        message: 'Info changed 🤗',
        order: update,
    })
})

export const deleteOrder = catchAsync(async (req, res, next) => {
    const { order } = req;

    if (!order) {
        return res.status(404).json({
            message: 'Order not found'
        })
    }

    if (order.status === 'completed') {
        return res.status(400).json({
            message: 'Order cannot be deleted. It has been completed.'
        });
    }
    if (order.status === 'cancelled') {
        return res.status(400).json({
            message: 'Order cannot be deleted. It has been cancelled previously.'
        });
    }
    await mealOrderService.delete(order);
    return res.status(200).json({
        message: 'Order deleted successfully.! 🙂'
    });

})