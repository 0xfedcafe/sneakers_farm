
class BrandResource{
  constructor(){

  }

  toJson(sneaker){
    return {
      id: sneaker.sneaker_id,
      model: sneaker.model,
      addition: sneaker.addition
    }
  }
}

module.exports = BrandResource
