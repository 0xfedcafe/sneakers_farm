const cheerio = require('cheerio')
const Shop = require('./Shop')

class Solesupremacy extends Shop{
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
      $('.product-variants').find('option').each((i,el)=>{
        const price = {
          size : this.StringTools.getNthNum($(el).text()),
          price: Math.round(this.StringTools.getNthNum($(el).text(),1)),
          href: href.href,
          shoeCondition: 'new',
          boxCondition: 'new'
        }
        if(!isNaN(price.price))prices.push(price);
      })
    } catch (e) {
      console.log(html);
    } finally {
      return prices
    }
  }

  async resolveLink(modelId){
    var html = await this.Requester.get({
        method: 'GET',
        url: `https://www.solesupremacy.com/search?type=product&q=`+modelId
    })

    return this.distructLink(html,modelId)
  }

  async distructLink(html,modelId){
    const results = []
    try {
      var $ = cheerio.load(html);
      $('.grid-item.search-result.large--one-fifth.medium--one-third.small--one-half').each((i,el)=>{
        results.push($(el).find('a').attr('href'))
      })
      for(let result of results){
        if(await this.fits(result,modelId))
          return {
            href: "https://www.solesupremacy.com"+result,
            shop: 'Solesupremacy.com'
          }
      }
      return null
    } catch (e) {
      return null
    }
  }

  async fits(link,modelId){
    var html = await this.Requester.get({
        method: 'GET',
        url: "https://www.solesupremacy.com"+link
    })
    try {
      const $ = cheerio.load(html)
      const sku = $($('.product-description').find('p')[1]).text()
      if(sku.search(modelId)>=0)
        return true
      return false
    } catch (e) {
      return false
    }
  }
}

module.exports = Solesupremacy
