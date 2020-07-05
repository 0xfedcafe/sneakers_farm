
class NameResolver{

  constructor({config, StringTools}){
    this.config = config
    this.StringTools = StringTools
  }
  distructName(name){
    const array = this.distructWords(name)
    const brands = this.distructBrands(array)
    const lines = this.distructLines(array)
    const additions = this.distructAdditions(array)
    return{
      brands: brands,
      set: this.toName(lines),
      model: this.toName(array),
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

  distructLines(array){
    const result = []
    for(let line of this.config.lines){
      if(array.includes(line)){
        array.splice(array.indexOf(line),1)
        result.push(line)
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

export default NameResolver
