import Sequelize from 'sequelize'
import config from './keys'

class Seq{
  constructor(){
    return new Sequelize(config.sql.database,config.sql.user,config.sql.password,{
      host:config.sql.host,
      dialect:'mysql',
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })
  }
}

export default Seq
