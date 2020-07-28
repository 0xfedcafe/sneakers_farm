const cheerio = require('cheerio')
const Shop = require('./Shop')


class UrbanNecessities extends Shop{
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
      $('.variant-grid.mygrid').find('li').each( (i,el)=>{
        const text = $(el).text()

        let boxCondition = 'new'
        let shoeCondition = 'new'

        if(text.search('Damaged Box') >=0){
          boxCondition = 'damaged'
        }
        if(text.search('Discoloration') >=0){
          shoeCondition = 'discoloration'
        }
        if(text.search('Worn') >=0){
          shoeCondition = 'worn'
        }

        prices.push({
          size: this.StringTools.getNthNum(text),
          price: this.StringTools.getNthNum(text,1),
          href: href.href,
          shoeCondition: shoeCondition,
          boxCondition: boxCondition
        })
      })
    } catch (e) {
      console.log(e);
    } finally {
      return prices
    }
  }

  async resolveLink(modelId){
    var html = await this.Requester.get({
        method: 'POST',
        url: `https://d0r2fzj10t-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.27.1%3Binstantsearch.js%201.12.1%3BJS%20Helper%202.26.0&x-algolia-application-id=D0R2FZJ10T&x-algolia-api-key=5580fa89e876a95398452d4650902d55`,
        body: JSON.stringify({"requests":[{"indexName":"shopify_products","params":"query="+modelId}]})
    })

    return this.distructLink(html,modelId)
  }

  async distructLink(html,modelId){
    try {
      const json = JSON.parse(html)
      for(let hit of json.results[0].hits){
        if(this.fits(hit,modelId)){
          return {
            href: 'https://urbannecessities.com/products/'+ hit.handle,
            shop: 'UrbanNecessities.com'
          }
        }
      }
      return null
    } catch (e) {
      return null
    }
  }

  fits(json,modelId){
    if(json.title.search(modelId)>=0)
      return true
    return false
  }

}

module.exports = UrbanNecessities
