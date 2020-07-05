import Sequelize from 'sequelize'

class ImageModel{
  constructor({ sequelize }){
    const model = sequelize.define('image',{
        image_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        href: {
          type: Sequelize.STRING(200),
          allowNull: false
        }
    })
    return model
  }
}

export default ImageModel
