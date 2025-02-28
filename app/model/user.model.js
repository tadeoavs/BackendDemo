import { Model, DataTypes } from 'sequelize';
import { DatabaseConfig } from '../config/database.config.js';

export class UserModel extends Model { }

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.STRING(20),
        allowNull: true,
    }
}, {
    sequelize: DatabaseConfig,
    modelName: 'user',
    timestamps: false,
    tableName: 'User',
});