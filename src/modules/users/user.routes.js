import express from 'express'
import {
    createUser,
    login,
    updateProfile,
    deleteUser,    
    findAll,
    GetOne,    
    findOneOrderById
} from './userController.js'
import { protect, protectAccountOwner, validateExistUser } from './user.middleware.js';
import { getAllOrders } from '../orders/order.controller.js';

export const router = express.Router();

router.post('/signup', createUser);

router.post('/login', login);

// Rutas Publicas

router.get('/', findAll);

router.use(protect)

router.get('/orders', getAllOrders);

router.get('/:id', GetOne);

router.patch('/:id', validateExistUser, protectAccountOwner, updateProfile);

router.delete('/:id', validateExistUser, protectAccountOwner, deleteUser);

router.get('/orders/:id', findOneOrderById);