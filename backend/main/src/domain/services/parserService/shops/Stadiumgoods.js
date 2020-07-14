const cheerio = require('cheerio')
const Shop = require('./Shop')

class Stadiumgoods extends Shop{
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
      $('.product-sizes__detail').each( (i,el)=>{
        var t="";
        if($(el).find('.price').length>1){
            var but=$(el).find('.price')[1];
            t =$(but).text();

        }
        else t = $(el).find('.price').text();
        const price = {
          size: this.StringTools.getNthNum($(el).find('.product-sizes__size').text()),
          price: this.StringTools.getNthNum(t),
          href: href.href,
          shoeCondition: 'new',
          boxCondition: 'new'
        }
        if(!isNaN(price.price) && !isNaN(price.size))prices.push(price);
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
        url: `https://graphql.stadiumgoods.com/graphql`,
        headers: {
          'authority':'graphql.stadiumgoods.com',
          'accept':'application/json',
          'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
          'content-type':'application/json',
          'origin':'https://www.stadiumgoods.com',
          'sec-fetch-site':'same-site',
          'sec-fetch-mode':'cors',
          'sec-fetch-dest':'empty',
          'referer':'https://www.stadiumgoods.com/adidas-yeezy-500-salt-ee7287',
          'accept-language':'en-GB,en-US;q=0.9,en;q=0.8,uk;q=0.7,ru;q=0.6',
        },
        body: JSON.stringify({"operationId":"sg-front/cached-45aec6effc56af980c233bd3dc02ab62","variables":{"searchQuery":modelId},"locale":"FRA_EUR"})
    })

    return this.distructLink(html,modelId)
  }

  async distructLink(html,modelId){
    try{
      const json = JSON.parse(html)
      for(let hit of json.data.configurableProducts.edges){
        if(this.fits(hit.node,modelId)){
          return {
            href: hit.node.pdpUrl,
            shop: 'Stadiumgoods.com'
          }
        }
      }
      return null
    } catch (e) {
      return null
    }
  }

  fits(json,modelId){
    if(json.manufacturerSku==modelId)
      return true
    return false
  }
}


module.exports = Stadiumgoods
