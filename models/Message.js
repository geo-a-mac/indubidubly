const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model {}

Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        message_text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        employer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employer',
                key: 'id'
            }
        }  
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'employer'
    }
);

module.exports = Message;