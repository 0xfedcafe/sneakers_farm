
class SneakerExtended{
  constructor({Updater, NameResolver, PriceResource}){
    this.Updater = Updater
    this.NameResolver = NameResolver
    this.PriceResource = PriceResource
  }

  async toJson(sneaker){
    const result = {
      sneaker_id: sneaker.sneaker_id,
      colorway: sneaker.colorway,
      addition: sneaker.addition,
    }

    if(sneaker.image){
      result.image = sneaker.image.href
    }
    else{
      const image = await sneaker.getImage()
      image
        ? result.image = image.href
        : result.image = 'undefined'
    }

    if(sneaker.description){
      result.description = sneaker.description.content
    }
    else{
      const description = await sneaker.getDescription()
      description
        ? result.description = description.content
        : result.description = 'undefined'
    }

    if(sneaker.extended){
      result.view_count = sneaker.extended.view_count
    }
    else{
      const extended = await sneaker.getExtended()
      extended
        ? result.view_count = extended.view_count
        : result.view_count = 0
    }

    sneaker.brands
      ? result.brands = this.NameResolver.toName(sneaker.brands.map((el)=>el.name))
      : result.brands = this.NameResolver.toName((await sneaker.getBrands()).map((el)=>el.name))

    sneaker.model
      ? result.model = sneaker.model.name
      : result.model = (await sneaker.getModel()).name

    result.prices = (await this.Updater.getRelevantPrices(sneaker)).map((size)=> {
      return {
        size: size.size,
        prices: size.prices.map((price)=>{
          return this.PriceResource.toJson(price)
        })
      }
    })

    //console.log(result.prices);

    return result
  }
}

module.exports = SneakerExtended
