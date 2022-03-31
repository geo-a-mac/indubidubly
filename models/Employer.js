const { Model, DataTypes } =  require('sequelize');
const sequelize = require('../config/connection');
const argon2 = require('argon2');

class Employer extends Model {
    checkPassword(loginPw) {
        return argon2.verify(this.password, loginPw)
    }
}

Employer.init(
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
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newEmployerData) {
                newEmployerData.password = await argon2.hash(newEmployerData.password);
                return newEmployerData;
            },

            async beforeUpdate(updatedEmployerData) {
                updatedEmployerData.password = await argon2.hash(updatedEmployerData.password);
                return updatedEmployerData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'employer'
    }
);

module.exports = Employer;