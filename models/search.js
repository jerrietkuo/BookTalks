const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Search extends Model {}

Search.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    query: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    result: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'search',
  }
);

module.exports = Search;