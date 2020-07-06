import Sequelize from 'sequelize'
import config from './keys'

class Seq{
  constructor(){
    return new Sequelize(config.sql.database,config.sql.user,config.sql.password,{
      host:config.sql.host,
      dialect:'mysql',
      logging: false,
      pool: {
        max: 10,
      }
    })
  }
}

export default Seq
