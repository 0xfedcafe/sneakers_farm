
class Sneaker {

  constructor({sneakersRepository, descriptionsRepository, brandsRepository, setsRepository, pricesRepository, extendedsRepository, imagesRepository, hrefsRepository, Parser, NameResolver, Logger}){
    this.sneakersRepository = sneakersRepository
    this.descriptionsRepository = descriptionsRepository
    this.brandsRepository = brandsRepository
    this.setsRepository = setsRepository
    this.pricesRepository = pricesRepository
    this.extendedsRepository = extendedsRepository
    this.imagesRepository = imagesRepository
    this.hrefsRepository = hrefsRepository

    this.NameResolver = NameResolver
    this.Logger = Logger

    this.Parser = Parser
  }

  async removeGlobal(){
    const description = await this.getDescription()
    const brands = await this.getBrands()
    const sets = await this.getSets()
    const extended = await this.getExtended()
    const image = await this.getImage()
    const prices = await this.getPrices()
    const hrefs = await this.getHrefs()

    await this.descriptionsRepository.remove(description)
    await this.imagesRepository.remove(extended)
    await this.extendedsRepository.remove(image)

    for(let brand of brands){
      await this.brandsRepository.remove(brand)
    }

    for(let set of sets){
      await this.setsRepository.remove(set)
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
    if(attributes.includes('sets'))
      this.dataValues.sets = await this.getSets()
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

    const set = await this.setsRepository.findOrCreate({name: name.set})
    await this.addSet(set)

    for(let brandName of name.brands){
      const brand = await this.brandsRepository.findOrCreate({name: brandName})
      await this.addBrand(brand)
      await brand.addSet(set)
    }

    const image = await this.imagesRepository.create({href:info.image})
    await this.setImage(image)

    const extended = await this.extendedsRepository.create({view_count:0})
    await this.setExtended(extended)

    this.release_date = info.release_date
    this.model = name.model
    this.addition = name.addition


    await this.save()
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

}

export default  Sneaker;
