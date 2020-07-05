import SQLRepository from './SQLRepository'

class SneakersRepository extends SQLRepository{

  constructor({ Sneaker, Description, Brand, Set, Price, Image, Extended, Href, sequelize }){
    super()
    this.model = Sneaker
    this.Sneaker = Sneaker
    this.Description = Description
    this.Brand = Brand
    this.Set = Set
    this.Price = Price
    this.Image = Image
    this.Extended = Extended
    this.Href = Href
    this.sequelize = sequelize
  }

  async find(query = null,{ attributes = null, limit = null, order = ['release_date']}){
    const results = await this.model.findAll({
        where: query,
        attributes: attributes,
        order: order,
        limit: limit
    })

    if(limit==1){
      return results[0]
    }
    else{
      return results
    }
  }

  async populate( query, { attributes = null, include = [], limit = null, order = ['release_date'] }){
    for(var prop of include){
      switch (prop.model) {
        case 'description':
          prop.model = this.Description
          break;
        case 'prices':
          prop.model = this.Price
          break;
        case 'hrefs':
          prop.model = this.Href
          break;
        case 'brands':
          prop.model = this.Brand
          break;
        case 'sets':
          prop.model = this.Set
          break;
        case 'extended':
          prop.model = this.Extended
          break;
        case 'image':
          prop.model = this.Image
          break;
      }
    }

    const models =  await this.model.findAll({
        where: query,
        attributes: attributes,
        include:  include,
        limit: limit,
        order: order
    })

    if(limit==1){
      return models[0]
    }
    else{
      return models
    }
  }

  async create(body, {description = null, brands = [], sets = [], extended = null, image = null, prices = [], hrefs = []}){
    const sneaker = await this.model.create(body)
    await sneaker.setDescription(description)
    await sneaker.setExtended(extended)
    await sneaker.setImage(image)

    for(let brand of brands){
      await sneaker.addBrand(brand)
    }

    for(let set of sets){
      await sneaker.addSet(set)
    }

    for(let price of prices){
      await price.setSneaker(sneaker)
    }

    for(let href of hrefs){
      await href.setSneaker(sneaker)
    }

    return sneaker
  }

  async createMany(indexes){
    for(let id of indexes){
      const sneaker = await this.create({sneaker_id:id},{})
      await sneaker.parseLinks()
      await sneaker.parseInfo()
    }
  }

  async addBrand(sneaker,brand){
    await this.sequelize.query("insert into Sneaker_Brands (sneaker_id,brand_id) values ('"+sneaker.sneaker_id+"',"+brand.brand_id+");")
  }

  async addSet(sneaker,set){
    await this.sequelize.query("insert into Sneaker_Sets (sneaker_id,set_id) values ('"+sneaker.sneaker_id+"',"+set.set_id+");")
  }


}

export default SneakersRepository
