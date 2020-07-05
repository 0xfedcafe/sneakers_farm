import Sequelize from 'sequelize'


class Sneaker{
  constructor({ sequelize }){
    const model =  sequelize.define('sneaker',{
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
      lastUpdated: Sequelize.DATE

    })
    return model
  }
}
export default Sneaker
