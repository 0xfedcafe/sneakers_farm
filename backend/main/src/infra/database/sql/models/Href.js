const Sequelize = require('sequelize')


class HrefModel{
  constructor({ sequelize }){
    const model = sequelize.define('href',{
        href_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        sneaker_id: Sequelize.STRING(10),
        shop: Sequelize.STRING(20),
        href: Sequelize.STRING(200)
    })
    return model
  }
}

module.exports = HrefModel
