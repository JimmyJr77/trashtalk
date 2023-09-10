const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./Users');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_content: {
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
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'posts',
  }
);

// Define the relationship between User and Post
User.hasMany(Post, {
  foreignKey: 'user_id',
});
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = Post;
