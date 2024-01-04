import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';
// import { encryptedPassword } from '../../config/plugins/encripted-password.plugin.js';

const Meal = sequelize.define(
    'meals',
    {
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'restaurant_id'
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    },
);

export default Meal;
