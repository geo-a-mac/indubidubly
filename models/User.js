const { Model, DataTypes } =  require('sequelize');
const sequelize = require('../config/connection');
const argon2 = require('argon2');

class User extends Model {
    checkPassword(loginPw) {
        return argon2.verify(this.password, loginPw)
    }
}

User.init(
    {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        skill_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'skill',
                key: 'id'
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await argon2.hash(newUserData.password);
                return newUserData;
            },

            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await argon2.hash(updatedUserData.password);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }

);

module.exports = User;