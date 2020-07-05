import SQLRepository from './SQLRepository'

class HrefsRepository extends SQLRepository{

  constructor({ Sneaker, Href}){
    super()
    this.model = Href
    this.Sneaker = Sneaker
  }

  async populate(query,{attributes = null, include = [], limit = null}){
    for(var prop of include){
      switch (prop.model) {
        case 'sneaker':
          prop.model = this.Sneaker
          break;
      }
    }

    const models =await this.model.findAll({
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

export default HrefsRepository
