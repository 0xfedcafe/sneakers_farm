const cheerio = require('cheerio')
const Shop = require('./Shop')

class Solestage extends Shop{
  constructor({ StringTools, config, Requester }){
    super()
    this.config = config
    this.StringTools = StringTools
    this.Requester = Requester
  }

  async resolvePrices(href, modelId){
    var html = await this.Requester.get({
        method: 'GET',
        url: href.href.substr(0,href.href.search('_pos')-1) + '.json'
    })

    return {prices: this.distructJson(html, href),shop: href.shop}
  }

  distructJson(html, href){
    const prices= [];
    try {
      var jsonArray = JSON.parse(html)
      for(var sizeObj of jsonArray.product.variants){
        const price = {
          size:this.StringTools.getNthNum(sizeObj.option1),
          price:this.StringTools.getNthNum(sizeObj.option3),
          href:href.href,
          shoeCondition: 'new',
          boxCondition: 'new'
        }
        if(!isNaN(price.price) && !isNaN(price.size) && !this.containSize(prices,price))prices.push(price)
      }
    } catch (e) {
      console.log(html);
    } finally {
      return prices
    }
  }

  async resolveLink(modelId){
    var html = await this.Requester.get({
        method: 'GET',
        url: `https://www.solestage.com/search?view=ajax&q=`+modelId+`*&type=product`
    })

    return this.distructLink(html,modelId)
  }

  async distructLink(html,modelId){
    const results = []
    try {
      var $ = cheerio.load(html);
      $('.ProductItem__Title.Heading').each((i,el)=>{
        results.push($(el).find('a').attr('href'))
      })
      for(let result of results){
        if(await this.fits(result,modelId))
          return {
            href: 'https://www.solestage.com' + result,
            shop: 'Solestage.com'
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
        url: 'https://www.solestage.com'+link
    })
    if(html.search(modelId)>=0)
      return true
    return false
  }

  containSize(array,element){
    for(var el of array){
      if(el.size == element.size)
        return true
    }
    return false
  }

}

module.exports = Solestage
