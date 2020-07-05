
class SneakersChannel{
  constructor({Parser, sneakersRepository, Updater}){
    this.sneakersRepository = sneakersRepository
    this.Parser = Parser
    this.Updater = Updater
  }

  async resolvePrices(data,socket){
    const sneaker = await this.sneakersRepository.populate({sneaker_id:data.sneaker_id},{limit:1})
    if(sneaker){
      const hrefs = await sneaker.getHrefs()

      const priceArrays = this.Parser.resolvePrices(hrefs,sneaker.sneaker_id)
      for(let promise of priceArrays){
        promise = promise.then(async (priceArray)=>{
          await this.Updater.updatePrices(data.sneaker_id,priceArray)
          socket.emit("prices",{prices: await this.Updater.getRelevantPrices(sneaker)})
        })
      }

      await Promise.all(priceArrays)
    }
  }

}

export default SneakersChannel
