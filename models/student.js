'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Email Address is Invalid. Please Re-submit Student'
        },
        isUnique: function(value, next) {
          Student.findOne({
              where: {
                email: value,
                id: {
                  [sequelize.Op.not]: this.id,
                }
              }
            })
            .then((found) => {
              if (found) {
                return next('Email Address already been used. Please Re-submit Student');
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
  // Instance Method
  Student.prototype.getFullName = function() {
    return this.first_name + ' ' + this.last_name;
  }
  return Student;
};
