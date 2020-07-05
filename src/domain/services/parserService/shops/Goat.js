import cheerio from 'cheerio'
import Shop from './Shop'

class Goat extends Shop{
  constructor({ StringTools, config, Requester }){
    super()
    this.config = config
    this.StringTools = StringTools
    this.Requester = Requester
  }

  async resolvePrices(href, modelId){
    var html = await this.Requester.get({
        method: 'GET',
        url:"https://www.goat.com/web-api/v1/product_variants?productTemplateId="+this.getUrl(href.href)
    })
    return {prices: this.distructJson(html, href),shop: href.shop}
  }

  getUrl(url){
    return url.substr(url.search('sneakers')+9,url.length-url.search('sneakers')+9);
  }

  distructJson(html, href){
    const prices= [];
    try {
      var jsonArray = JSON.parse(html)
      for(var sizeObj of jsonArray){
        let boxCondition = 'new'
        let shoeCondition = 'new'

        if(sizeObj.boxCondition == 'no_original_box'){
          boxCondition = 'no_original_box'
        }
        if(sizeObj.boxCondition == 'badly_damaged'){
          boxCondition = 'damaged'
        }
        if(sizeObj.shoeCondition == 'used'){
          shoeCondition = 'worn'
        }
        if(sizeObj.lowestPriceCents)prices.push({
          size: this.StringTools.getNthNum(String(sizeObj.size)),
          price: sizeObj.lowestPriceCents.amount/100,
          href: href.href,
          shoeCondition: shoeCondition,
          boxCondition: boxCondition
        })
      }
      return prices
    } catch (e) {
      console.log(e)
    }
    finally{
      return prices
    }
  }

  async resolveLink(modelId){
    var html = await this.Requester.get({
        method: 'POST',
        url: `https://2fwotdvm2o-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.25.1%3BJS%20Helper%20(3.1.2)%3Breact%20(16.9.0)%3Breact-instantsearch%20(6.5.0)&x-algolia-application-id=2FWOTDVM2O&x-algolia-api-key=ac96de6fef0e02bb95d433d8d5c7038a`,
        body: JSON.stringify({"requests":[{"indexName":"product_variants_v2","params":"query="+modelId}]})
    })

    return this.distructLink(html,modelId)
  }

  async distructLink(html,modelId){
    try {
      const json = JSON.parse(html)
      for(let hit of json.results[0].hits){
        if(this.fits(hit,modelId))
          return {
            href: 'https://www.goat.com/sneakers/'+hit.slug,
            shop: 'Goat.com'
          }
      }
      return null
    } catch (e) {
      console.log(html)
      return null
    }
  }

  async resolveInfo(modelId){
    var html = await this.Requester.get({
        method: 'POST',
        url: `https://2fwotdvm2o-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.25.1%3BJS%20Helper%20(3.1.2)%3Breact%20(16.9.0)%3Breact-instantsearch%20(6.5.0)&x-algolia-application-id=2FWOTDVM2O&x-algolia-api-key=ac96de6fef0e02bb95d433d8d5c7038a`,
        body: JSON.stringify({"requests":[{"indexName":"product_variants_v2","params":"query="+modelId}]})
    })

    return this.distructInfo(html,modelId)
  }

  async distructInfo(html,modelId){
    try {
      const json = JSON.parse(html)
      for(let hit of json.results[0].hits){
        if(this.fits(hit,modelId))
          return {
            name: hit.name,
            image: hit.grid_picture_url,
            release_date: hit.release_date
          }
      }
      return null
    } catch (e) {
      return null
    }
  }

  fits(json,modelId){
    if(json.sku==modelId)
      return true
    return false
  }

}

export default Goat
