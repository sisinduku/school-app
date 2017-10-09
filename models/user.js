'use strict';
const generateSecret = require('../helpers/generateSecret');
const encryptAES256CTR = require('../helpers/encryptAES256CTR');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: DataTypes.STRING,
    secret: {
      type: DataTypes.STRING,
      validate: {
        isUnique: function(value, next) {
          User.findOne({
              where: {
                secret: value,
                id: {
                  [sequelize.Op.not]: this.id,
                }
              }
            })
            .then((found) => {
              if (found) {
                return next('Secret already been used.');
              }
              return next();
            })
            .catch(reason => {
              console.log(reason);
            });
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, option) => {
        user.secret = generateSecret();
        user.password = encryptAES256CTR(user.password, user.secret);
      },
      beforeBulkCreate: (users, option) => {
        users = users.map(user => {
          user.secret = generateSecret();
          user.password = encryptAES256CTR(user.password, user.secret);
        });
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
