import SQLRepository from './SQLRepository'

class BrandsRepository extends SQLRepository{

  constructor({ Sneaker, Brand, Set}){
    super()
    this.model = Brand
    this.Set = Set
    this.Sneaker = Sneaker
  }

  async populate(query, { attributes = null, include = [], limit = null }){
    for(var prop of include){
      switch (prop.model) {
        case 'sneakers':
          prop.model = this.Sneaker
          break;
        case 'sets':
          prop.model = this.Set
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

export default BrandsRepository
