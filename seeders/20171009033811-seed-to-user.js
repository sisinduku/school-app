'use strict';
const encryptAES256CTR = require('../helpers/encryptAES256CTR');
const generateSecret = require('../helpers/generateSecret');
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let salt1 = generateSecret();
    let salt2 = generateSecret();
    let salt3 = generateSecret();
    return queryInterface.bulkInsert('Users', [{
      username: 'johndoe',
      role: 'teacher',
      secret: salt1,
      password: encryptAES256CTR('foobar', salt1),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      username: 'pakdengklek',
      secret: salt2,
      password: encryptAES256CTR('aselole', salt2),
      role: 'academic',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      username: 'charlesxavier',
      secret: salt3,
      password: encryptAES256CTR('joss', salt3),
      role: 'headmaster',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
