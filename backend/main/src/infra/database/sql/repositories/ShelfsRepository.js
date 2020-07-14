const SQLRepository = require('./SQLRepository')

class ShelfsRepository extends SQLRepository{

  constructor({ Shelf, Sneaker, User}){
    super()
    this.model = Shelf
    this.Sneaker = Sneaker
    this.User = User
  }

  async populate(query,{attributes = null, include = [], limit = null}){
    for(var prop of include){
      switch (prop.model) {
        case 'sneakers':
          prop.model = this.Sneaker
          break;
        case 'user':
          prop.model = this.User
          break;
      }
    }

    const models = await this.model.findAll({
        where: query,
        attributes: attributes,
        include:  include,
        limit: limit
    })

    if(limit==1){
      return models[0]
    }
    else{
      return models
    }
  }

}

module.exports = ShelfsRepository
