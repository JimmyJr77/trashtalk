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
    replies_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
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
    underscored: true,
    freezeTableName: true,
    modelName: 'replies',
  }
);

module.exports = Reply;
