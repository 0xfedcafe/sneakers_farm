const SQLRepository = require('./SQLRepository')

class DescriptionsRepository extends SQLRepository{

  constructor({ Sneaker, Description}){
    super()
    this.model = Description
    this.Sneaker = Sneaker
  }

  async populate(query,{attributes = null, include = [], limit = null}){
    for(var prop of include){
      switch (prop.model) {
        case 'sneakers':
          prop.model = this.Sneaker
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

module.exports = DescriptionsRepository
