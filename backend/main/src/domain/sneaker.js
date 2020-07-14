const Sequelize = require('sequelize')

class Sneaker {

  constructor({sneakersRepository, descriptionsRepository, brandsRepository, modelsRepository, pricesRepository, extendedsRepository, imagesRepository, hrefsRepository,
     Parser, NameResolver, Logger, Updater, config, sequelize}){
    this.sneakersRepository = sneakersRepository
    this.descriptionsRepository = descriptionsRepository
    this.brandsRepository = brandsRepository
    this.modelsRepository = modelsRepository
    this.pricesRepository = pricesRepository
    this.extendedsRepository = extendedsRepository
    this.imagesRepository = imagesRepository
    this.hrefsRepository = hrefsRepository

    this.NameResolver = NameResolver
    this.Logger = Logger
    this.Updater = Updater

    this.Parser = Parser
    this.config = config
    this.sequelize = sequelize
  }

  async removeGlobal(){
    const description = await this.getDescription()
    const brands = await this.getBrands()
    const model = await this.getModel()
    const extended = await this.getExtended()
    const image = await this.getImage()
    const prices = await this.getPrices()
    const hrefs = await this.getHrefs()

    await this.descriptionsRepository.remove(description)
    await this.imagesRepository.remove(extended)
    await this.extendedsRepository.remove(image)
    await this.modelsRepository.remove(model)

    for(let brand of brands){
      await this.brandsRepository.remove(brand)
    }

    for(let price of prices){
      await this.pricesRepository.remove(price)
    }

    for(let href of hrefs){
      await this.hrefsRepository.remove(href)
    }

    await this.sneakersRepository.remove(this)
  }

  async populate(attributes){
    if(attributes.includes('brands'))
      this.dataValues.brands = await this.getBrands()
    if(attributes.includes('model'))
      this.dataValues.model = await this.getModel()
    if(attributes.includes('description'))
      this.dataValues.description = await this.getDescription()
    if(attributes.includes('extended'))
      this.dataValues.extended = await this.getExtended()
    if(attributes.includes('image'))
      this.dataValues.image = await this.getImage()
    if(attributes.includes('hrefs'))
      this.dataValues.hrefs = await this.getHrefs()
    if(attributes.includes('prices'))
      this.dataValues.prices = await this.getPrices()

    return this
  }

  async parseLinks(){
    let links = await Promise.all(this.Parser.resolveLinks(this.sneaker_id))
    links = links.filter(link=>link)
    for(let link of links){
      const href = await this.hrefsRepository.create(link)
      await href.setSneaker(this)
    }

    return links
  }

  async parseInfo(){
    const info = await this.Parser.resolveInfo('Goat.com',this.sneaker_id)

    const name = this.NameResolver.distructName(info.name)

    const model = await this.modelsRepository.findOrCreate({name: name.model})
    await this.setModel(model)

    for(let brandName of name.brands){
      const brand = await this.brandsRepository.findOrCreate({name: brandName})
      await this.addBrand(brand)
      await brand.addModel(model)
    }

    const image = await this.imagesRepository.create({href:info.image})
    await this.setImage(image)

    const extended = await this.extendedsRepository.create({view_count:0})
    await this.setExtended(extended)

    this.release_date = info.release_date
    this.colorway = name.colorway
    this.addition = name.addition
    this.lastUpdated = new Date()


    await this.save()
  }

  async parsePrices(){
    const hrefs = await this.getHrefs()

    const priceArrays = this.Parser.resolvePrices(hrefs,this.sneaker_id)
    for(let promise of priceArrays){
      promise = promise.then(async (priceArray)=>{
        await this.Updater.updatePrices(this.sneaker_id,priceArray)
      })
    }

    await Promise.all(priceArrays)
  }

  async getMinValues(){
    const minPrice = await this.pricesRepository.find({sneaker_id: this.sneaker_id},{order:['price'], limit: 1})
    if (minPrice) {
      return {
        price: minPrice.price,
        shop: minPrice.shop
      }
    }
    else{
      return {
        price: 'undefined',
        shop: 'undefined'
      }
    }
  }

  needParsing(){
    if(this.isBigTimeout(new Date(this.lastUpdated))){
      return true
    }
    return false
  }

  isBigTimeout(date){
    if(Math.abs((new Date()).getTime()-date.getTime())>this.config.parse_delay){
      return true
    }
    return false
  }

  async updateTimestamps(){
    this.lastUpdated = new Date()
    await this.sneakersRepository.save(this)
  }

}

module.exports =  Sneaker;
