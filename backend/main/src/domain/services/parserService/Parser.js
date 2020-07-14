
class Parser{
  constructor({ UrbanNecessities, Solestage, Stadiumgoods, Flightclub, Stockx, Solesupremacy, Goat, Farfetch, Klekt, config }){
    this.UrbanNecessities =UrbanNecessities
    this.Solestage =Solestage
    this.Stadiumgoods =Stadiumgoods
    this.Flightclub =Flightclub
    this.Stockx =Stockx
    this.Solesupremacy =Solesupremacy
    this.Goat =Goat
    this.Farfetch =Farfetch
    this.Klekt =Klekt

    this.config = config
  }

  getResolver(shop){
    switch (shop) {
      case "UrbanNecessities.com":
        return this.UrbanNecessities;
        break;
      case "Solestage.com":
        return this.Solestage;
        break;
      case "Stadiumgoods.com":
        return this.Stadiumgoods;
        break;
      case "Flightclub.com":
        return this.Flightclub;
        break;
      case "Stockx.com":
        return this.Stockx;
        break;
      case "Solesupremacy.com":
        return this.Solesupremacy;
        break;
      case "Goat.com":
        return this.Goat;
        break;
      case "Farfetch.com":
        return this.Farfetch;
        break;
      case "Klekt.com":
        return this.Klekt;
        break;
    }
  }

  resolvePrices(hrefs, modelId){

    const results = []
    for(let href of hrefs){
      var resolver = this.getResolver(href.shop)
      results.push(resolver.resolvePrices(href, modelId))
    }
    return results
  }


  async resolvePrice(href,sneaker_id){
    var resolver = this.getResolver(href.shop)
    return await resolver.resolvePrices(href, sneaker_id)
  }

  resolveLinks(modelId){
    const links = []
    for(let shop of this.config.shops){
      var resolver = this.getResolver(shop)
      links.push(resolver.resolveLink(modelId))
    }
    return links
  }

  async resolveInfo(shop,modelId){
    var resolver = this.getResolver(shop)
    return resolver.resolveInfo(modelId)
  }

  async resolveLink(shop,modelId){
    var resolver = this.getResolver(shop)
    return await resolver.resolveLink(modelId)
  }


}


module.exports = Parser
