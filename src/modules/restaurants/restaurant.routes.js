import express from 'express'
import { protect, protectAccountOwner, restrictTo } from '../users/user.middleware.js'
import { UpdateRevieew, createRestaurant, createReview, deleteRestaurant, deleteReview, getAllRestaurants, getOneRestaurant, updateRestaurant } from './restaurant.controller.js';
import { validExistRestaurant, validExistReview } from './restaurant.middleware.js';
export const router = express.Router();

router.get('/', getAllRestaurants)

router.get('/:id', getOneRestaurant)

router.use(protect)

router.post('/', restrictTo('admin'), createRestaurant)

router.patch('/:id', restrictTo('admin'), validExistRestaurant, updateRestaurant)

router.delete('/:id', restrictTo('admin'), validExistRestaurant, deleteRestaurant)

router.post('/reviews/:id', validExistRestaurant, createReview)

router.patch('/reviews/:restaurantId/:id', validExistRestaurant, validExistReview,
    protectAccountOwner, UpdateRevieew)

router.route('/reviews/:restaurantId/:id', validExistRestaurant,
    validExistReview, protectAccountOwner).delete(validExistRestaurant,
        validExistReview,
        protectAccountOwner,
        deleteReview);

