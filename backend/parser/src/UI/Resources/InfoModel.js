
class InfoModel{
  constructor({ NameResolver }){
    this.nameResolver = NameResolver
  }

  toJson(body){
    const name = this.nameResolver.distructName(body.name)

    return {
       brands: name.brands,
       model: name.model,
       colorway: name.colorway,
       addition: name.addition,
       releaseDate: body.release_date,
       image: body.image,
       imageSource: body.imageSource,
       sneakerId: body.sneakerId
    }
  }
}

module.exports = InfoModel
