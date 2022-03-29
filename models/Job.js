const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Job extends Model {}

Job.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        information: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rate_of_pay: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        employer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employer',
                key: 'id'
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
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'job'
    }
);

module.exports = Job;