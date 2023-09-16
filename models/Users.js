const { Model, DataTypes } = require("sequelize");

const bcrypt = require('bcrypt');

const sequelize = require("../config/connection.js");

class Users extends Model {
  checkPassword(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  }
}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            isUnique: true,
        },
        email: {
            type: DataTypes.STRING,
            isUnique :true,
            allowNull:false,
            validate:{
                isEmail : true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [8]
            }
        }
    },
    {
        hooks: {
        beforeCreate: (user) => {
            user.password = bcrypt.hashSync(user.password, 10);
            return user;
        },
        beforeUpdate: (user) => {
            user.password = bcrypt.hashSync(user.password, 10);
            return user;
        }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "users",
    }
);
        
module.exports = Users;