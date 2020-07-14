const SQLRepository = require('./SQLRepository')

class UsersRepository extends SQLRepository{

  constructor({ sequelize, User, crypter }){
    super()
    this.model = User
    this.crypter = crypter
  }

  async create(body){
    const salt = this.crypter.getSalt()
    return this.model.create({
      name: body.name,
      email: body.email,
      password: this.crypter.getHash(body.password,salt),
      salt: salt
    })
  }

}

module.exports = UsersRepository
