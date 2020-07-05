import Sequelize from 'sequelize'

class BrandModel{
  constructor({ sequelize }){
    const model = sequelize.define('brand',{
        brand_id: {
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

export default BrandModel
