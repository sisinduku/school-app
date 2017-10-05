'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Email Address is Invalid. Please Re-submit Teacher'
        },
        isUnique: function(value, next) {
          Teacher.findOne({
              where: {
                email: value,
                id: {
                  [sequelize.Op.not]: this.id,
                }
              }
            })
            .then((found) => {
              if (found) {
                return next('Email Address already been used. Please Re-submit Teacher');
              }
              return next();
            })
            .catch(reason => {
              console.log(reason);
            });
        }
      }
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Teacher;
};
