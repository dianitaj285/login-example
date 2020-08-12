"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (user) => {
          return bcrypt.hash(user.password, saltRounds).then((hashPassword) => {
            user.password = hashPassword;
          });
        },
      },
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Todo, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      hooks: true,
    });
  };
  User.prototype.validatePassword = function (password) {
    debugger
    return bcrypt.compare(password, this.password);
  };
  return User;
};
