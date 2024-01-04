import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';
// import { encryptedPassword } from '../../config/plugins/encripted-password.plugin.js';

const Order = sequelize.define(
    'orders',
    {
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        mealId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'meal_id'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'total_price'
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('active', 'cancelled', 'completed', 'unavailable'),
            defaultValue: 'active',
            allowNull: false,
        },
    },
);

export default Order;
