import express from 'express'
import { router as userRoute } from '../modules/users/user.routes.js'
import { router as mealRoute } from '../modules/meals/meal.routes.js'
import { router as restaurantRouter } from '../modules/restaurants/restaurant.routes.js'
import { router as orderRoute } from '../modules/orders/order.routes.js'

export const router = express.Router();

router.use('/users', userRoute)
router.use('/meals', mealRoute)
router.use('/restaurants', restaurantRouter)
router.use('/orders', orderRoute)