import express from 'express'
import { protect, protectAccountOwner, restrictTo, validateExistUser } from '../users/user.middleware.js'
import { createMeal, deleteMeal, getAllMeals, getOneMeal, updateMeal } from './mealController.js';
import { validateExistMeal } from './mealMiddleware.js';

export const router = express.Router();



router.get('/', getAllMeals);

router.get('/:id', getOneMeal);

router.use(protect);

router.post('/:RestaurantId',restrictTo('admin'), createMeal);

router.patch('/:id', restrictTo('admin'), updateMeal);

router.delete('/:id', restrictTo('admin'), validateExistMeal, deleteMeal);