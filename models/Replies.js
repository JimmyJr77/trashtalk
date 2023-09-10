const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./Users');
const Post = require('./Posts');

class Reply extends Model {}

Reply.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "posts",
          key: "id",
        },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'replies',
  }
);

// Define the relationships between User, Post, and Reply
User.hasMany(Reply, {
  foreignKey: 'user_id',
});
Reply.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Reply, {
  foreignKey: 'post_id',
});
Reply.belongsTo(Post, {
  foreignKey: 'post_id',
});

module.exports = Reply;
