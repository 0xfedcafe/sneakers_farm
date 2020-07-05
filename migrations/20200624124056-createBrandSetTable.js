'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Brand_Sets",{
      brand_id: Sequelize.STRING(10),
      set_id: Sequelize.INTEGER,

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Brand_Sets")
  }
};
