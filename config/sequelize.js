import Sequelize from 'sequelize'
import config from './keys'

class Seq{
  constructor(){
    return new Sequelize(config.sql.database,config.sql.user,null,{
      host:config.sql.host,
      dialect:'mysql',
      logging: false
    })
  }
}

export default Seq
