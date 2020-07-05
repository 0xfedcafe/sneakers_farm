import Sequelize from 'sequelize'

class SetModel{
  constructor({ sequelize }){
    const model = sequelize.define('set',{
        set_id: {
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

export default SetModel
