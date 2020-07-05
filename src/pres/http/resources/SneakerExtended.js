
class SneakerExtended{
  constructor({Updater}){
    this.Updater = Updater
  }

  async toJson(sneaker){
    const result = {
      sneaker_id: sneaker.sneaker_id,
      model: sneaker.model,
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
      ? result.brands = sneaker.brands.map((el)=>el.name)
      : result.brands = (await sneaker.getBrands()).map((el)=>el.name)

    sneaker.sets
      ? result.sets = sneaker.sets.map((el)=>el.name)
      : result.sets = (await sneaker.getSets()).map((el)=>el.name)

    result.prices = await this.Updater.getRelevantPrices(sneaker)

    return result
  }
}

export default SneakerExtended
