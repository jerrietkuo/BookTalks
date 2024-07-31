const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Conversations extends Model {}

Conversations.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    signal: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'conversations',
    }
)

module.exports = Conversations;