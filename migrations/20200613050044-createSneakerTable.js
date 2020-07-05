const Sequelize = require('sequelize')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sneakers",{
      sneaker_id: {
        type: Sequelize.STRING(10),
        allowNull: false,
        primaryKey: true,
      },

      model: Sequelize.STRING(30),
      addition: Sequelize.STRING(60),
      release_date: Sequelize.DATE(),

      description_id: Sequelize.INTEGER,
      image_id: Sequelize.INTEGER,
      extended_id: Sequelize.INTEGER,
      lastUpdated: Sequelize.DATE,

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("sneakers")
  }
};
