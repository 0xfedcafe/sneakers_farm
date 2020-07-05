var fs = require('fs');

class BotController{

  constructor({ sneakersRepository, Logger}){
    this.sneakersRepository = sneakersRepository
    this.Logger = Logger
  }

  async parse(req,res){
    res.send("ready")
    for(let id of req.body.indexes){
      const sneaker = await this.sneakersRepository.create({sneaker_id: id},{})
      try {
        await sneaker.parseLinks()
        await sneaker.parseInfo()
        this.Logger.log('Sneaker '+sneaker.sneaker_id+' '+sneaker.model+' added with ' +(await sneaker.getHrefs()).length+' links')
        await sneaker.parsePrices()
        this.Logger.log('prices ready')
      } catch (e) {
        await sneaker.removeGlobal()
        this.Logger.log('Invalid sneaker id')
      }
    }
  }

  async delete(req,res){
    res.send("ready")
    for(let id of req.body.indexes){
      try {
        const sneaker = await this.sneakersRepository.find({sneaker_id: id},{attributes:['sneaker_id'],limit: 1})
        await sneaker.removeGlobal()
        this.Logger.log('Sneaker '+sneaker.sneaker_id+' deleted')
      } catch (e) {
        console.log(e);
        this.Logger.log('Error while deleting')
      }
    }
  }

  async index(req,res){
    res.json(await this.sneakersRepository.find(null,{attributes: ['sneaker_id'],limit:10}))
  }
}

export default BotController
