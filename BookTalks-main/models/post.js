const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Discussion = require('./Discussion');

const Post = sequelize.define('Post', {
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

Post.belongsTo(Discussion, { foreignKey: 'discussionId', onDelete: 'CASCADE' });
Discussion.hasMany(Post, { foreignKey: 'discussionId', onDelete: 'CASCADE' });

module.exports = Post;
