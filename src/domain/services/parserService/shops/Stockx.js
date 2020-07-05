import cheerio from 'cheerio'
var fs = require('fs');
import Shop from './Shop'

class Stockx extends Shop{
  constructor({ StringTools, config, Requester }){
    super()
    this.config = config
    this.StringTools = StringTools
    this.Requester = Requester
  }

  async resolvePrices(href, modelId){
    var html = await this.Requester.get({
        method: 'GET',
        url: href.href
    })

    return {prices: this.distructJson(html, href),shop: href.shop}
  }

  distructJson(html, href){
    const prices= [];
    try {
      const $ = cheerio.load(html);
      $('[type="application/ld+json"]').each( (i,el)=>{
        if($(el).html().search('"@type":"Product"')>=0){
          html = $(el).html()
        }
      })
      const jsonArray = JSON.parse(html)
      for(var offer of jsonArray.offers.offers){
        prices.push({
          size: offer.description,
          price: offer.price,
          href: href.href,
          shoeCondition: 'new',
          boxCondition: 'new'
        })
      }
    } catch (e) {
      console.log(e);
    } finally {
      return prices
    }
  }

  async resolveLink(modelId){
    var html = await this.Requester.get({
        method: 'POST',
        url: `https://xw7sbct9v6-2.algolianet.com/1/indexes/products/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.32.1&x-algolia-application-id=XW7SBCT9V6&x-algolia-api-key=6bfb5abee4dcd8cea8f0ca1ca085c2b3`,
        body: JSON.stringify({params:"query=" + modelId})
    })

    return this.distructLink(html,modelId)
  }

  async distructLink(html,modelId){
    try {
      const json = JSON.parse(html)
      for(let hit of json.hits){
        if(this.fits(hit,modelId)){
          return {
            href: 'https://stockx.com/'+ hit.url,
            shop: 'Stockx.com'
          }
        }
      }
      return null
    } catch (e) {
      return null
    }
  }

  fits(json,modelId){
    if(json.style_id==modelId)
      return true
    return false
  }
}

export default Stockx
