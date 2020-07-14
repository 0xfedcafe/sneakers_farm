const Sequelize = require('sequelize')


class ShelfModel{
  constructor({ sequelize }){
    const model = sequelize.define('shelf',{
        shelf_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        price: Sequelize.INTEGER
    })
    return model
  }
}

module.exports = ShelfModel
