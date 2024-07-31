const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Post = require('./post');

const Discussion = sequelize.define('Discussion', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: false,
});

Discussion.hasMany(Post, { foreignKey: 'discussionId', onDelete: 'CASCADE' });
Post.belongsTo(Discussion, { foreignKey: 'discussionId', onDelete: 'CASCADE' });

module.exports = Discussion;

