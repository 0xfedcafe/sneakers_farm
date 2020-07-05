
class Sneaker{
  constructor(){

  }

  async toJson(sneaker){
    const result = {
      sneaker_id: sneaker.sneaker_id,
      release_date: sneaker.release_date,
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

    sneaker.brands
      ? result.brands = sneaker.brands.map((el)=>el.name)
      : result.brands = (await sneaker.getBrands()).map((el)=>el.name)

    sneaker.sets
      ? result.sets = sneaker.sets.map((el)=>el.name)
      : result.sets = (await sneaker.getSets()).map((el)=>el.name)

    result.min = await sneaker.getMinValues()

    return result
  }
}

export default Sneaker
