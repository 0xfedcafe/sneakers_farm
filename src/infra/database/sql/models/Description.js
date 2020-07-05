import Sequelize from 'sequelize'


class Description{
  constructor({ sequelize }){
    const model = sequelize.define('description',{
        description_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        content: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        }
    })
    return model
  }
}
export default Description
