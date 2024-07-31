const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Book = require('./Book');

const Goal = sequelize.define('Goal', {
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  targetBooks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  booksRead: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: false,
});

Goal.hasMany(Book, { foreignKey: 'goalId', onDelete: 'CASCADE' });
Book.belongsTo(Goal, { foreignKey: 'goalId' });

module.exports = Goal;
