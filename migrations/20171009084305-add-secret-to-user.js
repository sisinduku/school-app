'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('Users',
        'secret', {
          type: Sequelize.STRING,
          allowNull: false,
        })
      .then(() => {
        return queryInterface.changeColumn('Users',
          'password', {
            type: Sequelize.STRING,
            allowNull: false,
          })
      })
      .catch(reason => {
        console.log(reason);
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('Users', 'secret')
      .then(() => {
        return queryInterface.changeColumn('Users',
          'password', {
            type: Sequelize.STRING,
            allowNull: true,
          })
      });
  }
};
