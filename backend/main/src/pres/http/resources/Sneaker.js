
class Sneaker{
  constructor({NameResolver}){
    this.NameResolver = NameResolver
  }

  async toJson(sneaker){
    const result = {
      sneaker_id: sneaker.sneaker_id,
      release_date: sneaker.release_date,
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

    sneaker.brands
      ? result.brands = this.NameResolver.toName(sneaker.brands.map((el)=>el.name))
      : result.brands = this.NameResolver.toName((await sneaker.getBrands()).map((el)=>el.name))

    sneaker.model
      ? result.model = sneaker.model.name
      : result.model = (await sneaker.getModel()).name

    result.min = await sneaker.getMinValues()

    return result
  }
}

module.exports = Sneaker
