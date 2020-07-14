const Sequelize = require('sequelize')

class ModelModel{
  constructor({ sequelize }){
    const model = sequelize.define('model',{
        model_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(20),
          allowNull: false
        }
    })
    return model
  }
}

module.exports = ModelModel
