import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';
import { encryptedPassword } from '../../config/plugins/encripted-password.plugin.js';

const User = sequelize.define(
    'users',
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
        email: {
            type: DataTypes.STRING(80),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('normal', 'admin'),
            allowNull: false,
            defaultValue: 'normal',
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    },
    {
        hooks: {
            beforeCreate: async (user) => {
                user.password = await encryptedPassword(user.password);
            },
        },
    }

);

export default User;
