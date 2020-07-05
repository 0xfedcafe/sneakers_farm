import SQLRepository from './SQLRepository'

class SetsRepository extends SQLRepository{

  constructor({ Sneaker, Set}){
    super()
    this.model = Set
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

  async create(body,{brand = null}){
    const set = await this.model.create(body)
    await set.addBrand(brand)
    return set
  }
}

export default SetsRepository
