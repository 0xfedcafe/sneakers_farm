import Sequelize from 'sequelize'


class User{
  constructor({ sequelize }){
    const model =  sequelize.define('user',{
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: Sequelize.STRING(30),
      email: Sequelize.STRING(30),
      password: Sequelize.STRING(100),
    })
    return model
  }
}
export default User
