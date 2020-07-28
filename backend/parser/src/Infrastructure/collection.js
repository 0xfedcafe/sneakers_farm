
class Collection{
  constructor({ Parser, InfoModel, LinksModel, ServerClient }){
    this.parser = Parser
    this.InfoModel = InfoModel
    this.LinksModel = LinksModel
    this.serverClient = ServerClient
  }

  consume(message){
    const type = this.getType(message)
    const body = String.fromCharCode.apply(null, message.content)
    this[type](JSON.parse(body))
  }

  getType(message){
    const words = message.properties.headers.type.split('\\')
    let type = words[words.length-1]
    return type.charAt(0).toLowerCase() + type.slice(1);
  }

  async parseInfo(body){
    const info = await this.parser.resolveInfo('Goat.com',body.sneakerId)
    const result = this.InfoModel.toJson(info)
    this.serverClient.request({
      type: 'parseInfo',
      body: result
    })
  }

  async parseLinks(body){
    const info = await this.parser.resolveLinks(body.sneakerId)
    const result = this.LinksModel.toJson(await Promise.all(info), body.sneakerId)
    this.serverClient.request({
      type: 'parseLinks',
      body: result
    })
  }

  async parsePrices(body){
    const info = await this.parser.resolvePrices(body.links, body.sneakerId)

    for(var shopPrices of info){
      shopPrices.then(el => {
        //var result = this.PricesListModel.toJson(el)
        el.sneakerId = body.sneakerId
        this.serverClient.request({
          type: 'parsePrices',
          body: el
        })
      })
    }
    Promise.all(info)
  }
}

module.exports = Collection
