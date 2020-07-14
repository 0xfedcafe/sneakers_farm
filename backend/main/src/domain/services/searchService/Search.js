
class Search{
  constructor({ sneakersRepository, StringTools }){
    this.StringTools = StringTools
    this.sneakersRepository = sneakersRepository
  }

  async byName(query, sneakers){
    const results = []
    for(let sneaker of sneakers){
      if(await this.fits(query,sneaker)){
        results.push(await sneaker.populate(['brands','model','description','extended','image']))
      }
    }
    return results
  }

  async fits(query,sneaker){
    const name = await this.nameToArray(sneaker)
    query = this.StringTools.distructWords(query)

    let similarWords = 0

    for(let queryWord of query){
      for(let nameWord of name){
        if(nameWord.search(queryWord)>=0){
          similarWords++
          break
        }
      }
    }

    if(similarWords>=query.length)
      return true
    return false

  }

  async nameToArray(sneaker){
    let result = []

    for(let brand of await sneaker.getBrands()){
      result.push(brand.name)
    }

    if(sneaker.addition){
      result = result.concat(this.StringTools.distructWords(sneaker.addition))
    }

    if(sneaker.colorway){
      result = result.concat(this.StringTools.distructWords(sneaker.colorway))
    }

    if(await sneaker.getModel()){
      result = result.concat(this.StringTools.distructWords((await sneaker.getModel()).name))
    }

    result.push(sneaker.sneaker_id)

    return result
  }


}

module.exports = Search;
