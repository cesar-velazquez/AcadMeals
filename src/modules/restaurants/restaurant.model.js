import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';
// import { encryptedPassword } from '../../config/plugins/encripted-password.plugin.js';

const Restaurant = sequelize.define(
    'restaurants',
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
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
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

export default Restaurant;
