import Sequelize from 'sequelize'


class PriceModel{
  constructor({ sequelize }){
    const model = sequelize.define('price',{
        price_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        sneaker_id: Sequelize.STRING(10),
        size: Sequelize.FLOAT,
        shop: Sequelize.STRING(20),
        href: Sequelize.STRING(200),
        price: Sequelize.INTEGER,
        boxCondition: Sequelize.STRING(20),
        shoeCondition: Sequelize.STRING(20),

    })
    return model
  }
}

export default PriceModel
