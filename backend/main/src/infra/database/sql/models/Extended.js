const Sequelize = require('sequelize')

class ExtendedModel{
  constructor({ sequelize }){
    const model = sequelize.define('extended',{
        extended_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        view_count: {
          type: Sequelize.INTEGER,
          default: 0
        }
    })
    return model
  }
}

module.exports = ExtendedModel
