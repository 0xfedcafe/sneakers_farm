'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Sneaker_Sets",{
      sneaker_id: Sequelize.STRING(10),
      set_id: Sequelize.INTEGER,

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Sneaker_Sets")
  }
};
