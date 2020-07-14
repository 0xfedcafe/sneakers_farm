const Sequelize = require('sequelize')
const config = require('./keys')

class Seq{
  constructor(){
    return new Sequelize(config.sql.database,config.sql.user,config.sql.password,{
      host:config.sql.host,
      port: config.sql.port,
      dialect:'mysql',
      logging: false,
      pool: {
        max: 10,
      }
    })
  }
}

module.exports =  Seq
