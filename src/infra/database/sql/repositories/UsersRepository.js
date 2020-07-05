import SQLRepository from './SQLRepository'
import argon from 'argon2'

class UsersRepository extends SQLRepository{

  constructor({ sequelize, User }){
    super()
    this.model = User
  }

  async create(body){
    return this.model.create({
      name: body.name,
      email: body.email,
      password: await argon.hash(body.password),
    })
  }

}

export default UsersRepository
