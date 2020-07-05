'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("descriptions",{
      description_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("descriptions")
  }
};
