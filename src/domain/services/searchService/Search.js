
class Search{
  constructor({ sneakersRepository, StringTools }){
    this.StringTools = StringTools
    this.sneakersRepository = sneakersRepository
  }

  async byName(query, sneakers){
    const results = []
    for(let sneaker of sneakers){
      if(await this.fits(query,sneaker)){
        results.push(await sneaker.populate(['brands','sets','description','extended','image']))
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

    for(let set of await sneaker.getSets()){
      result = result.concat(this.StringTools.distructWords(set.name))
    }

    for(let brand of await sneaker.getBrands()){
      result.push(brand.name)
    }

    if(sneaker.addition){
      result = result.concat(this.StringTools.distructWords(sneaker.addition))
    }

    if(sneaker.model){
      result = result.concat(this.StringTools.distructWords(sneaker.model))
    }

    result.push(sneaker.sneaker_id)

    return result
  }


}

export default Search;
