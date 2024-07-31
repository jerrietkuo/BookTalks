const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Chat extends Model {}

Chat.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    chat: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'chat',
    }
)

module.exports = Chat;