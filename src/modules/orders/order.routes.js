import express from 'express'
import { createOrder, deleteOrder, getAllOrders, getOneOrder, updateOrder } from './order.controller.js';
// import { validateExistMeal } from '../meals/mealMiddleware.js';
import { ValidateExistOrder, protectAccountOwnerOrder, validExistMeal } from './order.middleware.js';
import { validateExistMeal } from '../meals/mealMiddleware.js';
import { protect, protectAccountOwner } from '../users/user.middleware.js';

export const router = express.Router();

router.use(protect);

router.get('/', getAllOrders);

router.get('/:id', getOneOrder);

router.post('/', validExistMeal, createOrder);

router.patch('/:id',ValidateExistOrder, protectAccountOwnerOrder, updateOrder);

router.delete('/:id', ValidateExistOrder, protectAccountOwnerOrder, deleteOrder);



