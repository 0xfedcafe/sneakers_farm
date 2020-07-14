const userConfig = require('../config/userConfig')

module.exports = async (container) =>{
   return await container.usersRepository.create(userConfig)
}
