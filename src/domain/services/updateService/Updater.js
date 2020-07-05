
class Updater{
  constructor({ sneakersRepository, pricesRepository }){
    this.sneakersRepository = sneakersRepository
    this.pricesRepository = pricesRepository
  }

  async updatePrices(sneaker_id,priceArray){
    await this.pricesRepository.batchRemove({where: {sneaker_id:sneaker_id, shop: priceArray.shop}})

    for(let price of priceArray.prices){
      price.shop = priceArray.shop
      price.sneaker_id = sneaker_id
    }

    await this.pricesRepository.batchCreate(priceArray.prices)
  }

  async getRelevantPrices(sneaker){
    const prices = await sneaker.getPrices()
    return this.divideBySize(prices)
  }

  divideBySize(prices){
    const sizes = []
    for(let price of prices){
      let size = this.findSize(price.size, sizes)
      if(size){
        size.prices.push(price)
      }
      else{
        size = {size:price.size, prices:[price]}
        sizes.push(size)
      }
    }
    return sizes
  }

  findSize(size,sizes){
    for(let exSize of sizes){
      if(exSize.size == size)return exSize
    }
    return null
  }


}

export default Updater;
