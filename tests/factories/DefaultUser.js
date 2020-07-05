import userConfig from '../config/userConfig'

export default async (container) =>{
   return await container.usersRepository.create(userConfig)
}
