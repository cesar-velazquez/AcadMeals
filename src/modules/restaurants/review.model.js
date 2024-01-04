import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';
// import { encryptedPassword } from '../../config/plugins/encripted-password.plugin.js';

const Review = sequelize.define(
    'reviews',
    {
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        comment: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'restaurant_id'
        },
        raiting:{
            type: DataTypes.INTEGER,
            allowNull: false,            
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    },
);

export default Review;
