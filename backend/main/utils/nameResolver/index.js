
class NameResolver{

  constructor({config, StringTools}){
    this.config = config
    this.StringTools = StringTools
  }
  distructName(name){
    const array = this.distructWords(name)
    const brands = this.distructBrands(array)
    const models = this.distructModels(array)
    const additions = this.distructAdditions(array)
    return{
      brands: brands,
      model: this.toName(models),
      colorway: this.toName(array),
      addition: this.toName(additions)
    }
  }

  distructWords(string){
    const array = this.StringTools.distructWords(string)

    for(let trash of this.config.trash){
      if(array.includes(trash))
        array.splice(array.indexOf(trash),1)
    }

    return array
  }

  distructBrands(array){
    const result = []
    for(let brand of this.config.brands){
      if(array.includes(brand)){
        array.splice(array.indexOf(brand),1)
        result.push(brand)
      }
    }
    return result
  }

  distructModels(array){
    const result = []
    for(let models of this.config.models){
      if(array.includes(models)){
        array.splice(array.indexOf(models),1)
        result.push(models)
      }
    }
    return result
  }

  distructAdditions(array){
    const result = []
    for(let addition of this.config.additions){
      if(array.includes(addition)){
        array.splice(array.indexOf(addition),1)
        result.push(addition)
      }
    }
    return result
  }

  toName(array){
    let string = ''
    for(let word of array){
      string = string + word + ' '
    }
    return string.substr(0,string.length-1)
  }

}

module.exports = NameResolver
