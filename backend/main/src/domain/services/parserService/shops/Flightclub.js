const cheerio = require('cheerio')
const Shop = require('./Shop')

const graphQLConfig = {
  "operationName":"getProductTemplate",
  "variables":{"slug":"href"},
  "query":`query getProductTemplate($slug: String!) {\n  getProductTemplate(slug: $slug) {\n    ...GetProductDetails\n    __typename\n  }\n}\n\nfragment GetProductDetails on ProductTemplate {\n  id\n  storyHtml\n  sku\n  description\n  releaseDate {\n    shortDisplay\n    __typename\n  }\n  conditionalSizes {\n    productId\n    thumbnailUrl\n    images\n    size {\n      value\n      display\n      __typename\n    }\n    price {\n      value\n      ...ProductTemplatePriceDisplayParts\n      __typename\n    }\n    boxCondition\n    shoeCondition\n    isInstantShip\n    conditions\n    notes\n    __typename\n  }\n  newSizes {\n    productTemplateId\n    size {\n      value\n      display\n      __typename\n    }\n    shoeCondition\n    boxCondition\n    lowestPriceOption {\n      price {\n        value\n        ...ProductTemplatePriceDisplayParts\n        __typename\n      }\n      isAvailable\n      __typename\n    }\n    instantShipPriceOption {\n      price {\n        value\n        ...ProductTemplatePriceDisplayParts\n        __typename\n      }\n      isAvailable\n      __typename\n    }\n    isInstantShip\n    __typename\n  }\n  usedSizes {\n    productId\n    thumbnailUrl\n    images\n    size {\n      value\n      display\n      __typename\n    }\n    price {\n      value\n      ...ProductTemplatePriceDisplayParts\n      __typename\n    }\n    shoeCondition\n    boxCondition\n    isInstantShip\n    conditions\n    notes\n    __typename\n  }\n  usedVariants {\n    size {\n      value\n      display\n      __typename\n    }\n    price {\n      value\n      ...ProductTemplatePriceDisplayParts\n      __typename\n    }\n    shoeCondition\n    boxCondition\n    isInstantShip\n    __typename\n  }\n  newLowestPrice {\n    value\n    ...ProductTemplatePriceDisplayParts\n    __typename\n  }\n  sizeCategory\n  productCategory\n  __typename\n}\n\nfragment ProductTemplatePriceDisplayParts on Price {\n  localizedValue\n  display(useGrouping: false, hideEmptyCents: true)\n  __typename\n}\n`
}

const headers = {
  'authority' : 'www.flightclub.com',
  'accept' : '*/*',
  'x-csrf-token' : 'ii8YnuPJ-OpzEkhwtvC53qKArU8GOxr9Zujk',
  'user-agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
  'content-type' : 'application/json',
  'origin' : 'https://www.flightclub.com',
  'sec-fetch-site' : 'same-origin',
  'sec-fetch-mode' : 'cors',
  'sec-fetch-dest' : 'empty',
  'referer' : 'https://www.flightclub.com/yeezy-500-salt-salt-salt-805205',
  'accept-language' : 'en-GB,en-US;q=0.9,en;q=0.8,uk;q=0.7,ru;q=0.6',
  'cookie': `__cfduid=d84c2ec710c91ac48fb6ebd065f7dbacf1592469480; __stripe_mid=7d9eef31-f576-4301-9f2e-03ffe3576f8a; _ga=GA1.2.1943324279.1592469485; _gid=GA1.2.228316455.1592469485; _pxvid=0767b6ec-b13f-11ea-9242-0242ac120003; _nocache=undefined; _csrf=YDZnw2NM8Zv75qTe-UfLruPj; _fbp=fb.1.1592469629776.1941934513; _gat_mpgaTracker1=1; __stripe_sid=83c72add-2d39-4f77-9b9f-9f1450e2b8bb; _px3=a7eff6e4b762cc22669dae0e94877bfbd1aed21ee493fb88ff8a5d45860e965e:DQ2U5SscLZsKzm9EqSSGhlAv6PTXswqo6EtHD2+4rxH/N+KVzVrBwsT6+TsblBhEN03luodu5rR3e5kzKLcrbg==:1000:XknQJ70VMRtHgqSwSmL5U4VzhOZ2LeASnJLmkmzqUiJfcwdAi5Rx0bVgFZwSQhnkIfIYn4vuzuXMlMEo5lWtJwMJZKNLizwIJzViX8JmBNl8Bc3CyhigIH8J0RNVpQkcMz6dwYadBFqmaYLLXINa/hS9AbrO9ED3ClABO4XWxWs=; _px=DQ2U5SscLZsKzm9EqSSGhlAv6PTXswqo6EtHD2+4rxH/N+KVzVrBwsT6+TsblBhEN03luodu5rR3e5kzKLcrbg==:1000:stQDO4m1DRpRr6XHgzslNQOPDhsIYTiQQbYmraJnO6lBIH1YgHA1ibyvsEWxiKMQICV3r8zVmVgNdozWX+HHv/cw00pDAsJVdm6Smnar+gUfxT699oWmpqQYh03vUibOZq5uLHNmns9PFno8Qqj8zIKValfGVhMkOQOfvUCh5H8oJXNzl/RD+QtogDzEQlYOzbce0Nrvh+w/wRKLZy9KAXDgFILSpDpBjiFfxYrWIk+sk7VfIlRhLTsHU48UHErqhTh/vRiJOeOu2p6G6+fyKw==; _pxde=45f4ea09df15fd12931976a693fd7cd619110512bec09f37b644481ff8c15657:eyJ0aW1lc3RhbXAiOjE1OTI0NzM1Mzk1NTcsImZfa2IiOjAsImlwY19pZCI6WzVdfQ==; _xsrf=ii8YnuPJ-OpzEkhwtvC53qKArU8GOxr9Zujk`
}

class Flightclub extends Shop{
  constructor({ StringTools, config, Requester }){
    super()
    this.config = config
    this.StringTools = StringTools
    this.Requester = Requester
    this.headers = headers
    this.graphQLConfig = graphQLConfig
  }

  async resolvePrices(href, modelId){
    this.graphQLConfig.variables.slug = href.href.substr(27,href.href.length-27)
    var html = await this.Requester.get({
        method: 'POST',
        url:'https://www.flightclub.com/graphql',
        headers: this.headers,
        body: JSON.stringify(this.graphQLConfig)
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
      for(var sizeObj of jsonArray.data.getProductTemplate.usedSizes){
        prices.push({
          size:sizeObj.size.value,
          price:sizeObj.price.value/100,
          href:href.href,
          shoeCondition: 'worn',
          boxCondition: 'new'
        })
      }
      for(var sizeObj of jsonArray.data.getProductTemplate.newSizes){
        prices.push({
          size:sizeObj.size.value,
          price:sizeObj.lowestPriceOption.price.value/100,
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
        url: `https://2fwotdvm2o-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.32.0%3Breact-instantsearch%205.4.0%3BJS%20Helper%202.26.1&x-algolia-application-id=2FWOTDVM2O&x-algolia-api-key=ac96de6fef0e02bb95d433d8d5c7038a`,
        body: JSON.stringify({"requests":[{"indexName":"product_variants_v2_flight_club","params":"query="+modelId}]})
    })

    return this.distructLink(html,modelId)
  }

  async distructLink(html,modelId){
    try {
      const json = JSON.parse(html)
      for(let hit of json.results[0].hits){
        if(this.fits(hit,modelId))
          return {
            href: 'https://www.flightclub.com/'+hit.slug,
            shop: 'Flightclub.com'
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

module.exports = Flightclub
