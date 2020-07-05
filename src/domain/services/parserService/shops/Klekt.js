import cheerio from 'cheerio'
import Shop from './Shop'

class Klekt extends Shop{
  constructor({ StringTools, config, Requester }){
    super()
    this.config = config
    this.StringTools = StringTools
    this.Requester = Requester
  }

  async resolvePrices(href, modelId){
    var html = await this.Requester.get({
        method: 'GET',
        url: "https://4bgyha3fmu-dsn.algolia.net/1/indexes/dev_products2/"+this.getUrl(href.href)+"?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.30.0&x-algolia-application-id=4BGYHA3FMU&x-algolia-api-key=e1de1e2a0ec319eb6d78b7a462516981"
    })
    return {prices: this.distructJson(html, href),shop: href.shop}
  }

  getUrl(url){
    while(url.search('i')>=0){
      var pos = url.search('i');
      while(url[pos+1]<='9' && url[pos+1]>='0'){
      if(url[pos+1]<='9' && url[pos+1]>='0'){
        var i =0;
        while(url[pos+i+1]<='9' && url[pos+i+1]>='0'){
          i++;
        }
        return url.substr(pos+1,i);
      }}
      url=url.substr(pos+1,url.length-pos+1);
    }
  }

  distructJson(html, href){
    const prices= [];
    try {
      var jsonArray = JSON.parse(html)
      for(var sizeObj of jsonArray.inventory){
        prices.push({
          size: this.StringTools.getNthNum(sizeObj.size),
          price: Math.round(sizeObj.price*this.config.EurToUsd),
          href:href.href,
          shoeCondition: 'new',
          boxCondition: 'new'
        })
      }
    } catch (e) {
      console.log(html);
    } finally {
      return prices
    }
  }

  async resolveLink(modelId){
    var html = await this.Requester.get({
        method: 'POST',
        url: `https://4bgyha3fmu-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.30.0%3Breact-instantsearch%204.5.2%3BJS%20Helper%202.26.1&x-algolia-application-id=4BGYHA3FMU&x-algolia-api-key=e1de1e2a0ec319eb6d78b7a462516981`,
        body: JSON.stringify({"requests":[{"indexName":"dev_products2","params":"query="+modelId}]})
    })

    return this.distructLink(html,modelId)
  }

  async distructLink(html,modelId){
    try {
      const json = JSON.parse(html)
      for(let hit of json.results[0].hits){
        if(this.fits(hit,modelId))
          return {
            href: 'https://www.klekt.com/store/'+hit.uri,
            shop: 'Klekt.com'
          }
      }
      return null
    } catch (e) {
      return null
    }
  }

  fits(json,modelId){
    if(json.styleCode==modelId)
      return true
    return false
  }
}

export default Klekt
