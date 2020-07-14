var fs = require('fs');

class SneakersController{

  constructor({ sneakersRepository, descriptionsRepository, extendedsRepository, imagesRepository, brandsRepository, modelsRepository, Search, Requester, Parser,
     NameResolver, Sneaker, Brand, Logger, SneakerResource, SneakerExtendedResource, ModelResource }){
    this.sneakersRepository = sneakersRepository
    this.descriptionsRepository = descriptionsRepository
    this.extendedsRepository = extendedsRepository
    this.imagesRepository = imagesRepository
    this.brandsRepository = brandsRepository
    this.modelsRepository = modelsRepository

    this.SneakerResource = SneakerResource
    this.ModelResource = ModelResource
    this.SneakerExtendedResource = SneakerExtendedResource

    this.Search = Search
    this.Requester = Requester
    this.Parser = Parser
    this.NameResolver = NameResolver
    this.Logger = Logger

    this.Sneaker = Sneaker
    this.Brand = Brand
  }

  async getBrands(req,res){
    const brands = await this.brandsRepository.find(null,{attributes:['name','brand_id']})
    res.json({total: brands.length, results: brands})
  }

  async getModels(req,res){
    const models = []
    const brand = await this.brandsRepository.populate({brand_id:req.params.brand_id},{include:[{model: 'models', as: 'models'}],limit: 1})
    if(!brand){
      res.json({total: 0, results: []})
      return;
    }
    for(let model of brand.models){
      models.push(await this.ModelResource.toJson(model))
    }
    console.log(models);
    res.json({total: models.length, results: models})
  }

  async search(req,res){
    let sneakers = []
    if(req.query.model_id){
      const model = await this.modelsRepository.populate({model_id:req.query.model_id},{include: [{model:'sneakers', as: 'sneakers'}],limit: 1})
      if(model) sneakers = model.sneakers
    }
    else if(req.query.brand_id){
      const brand = await this.brandsRepository.populate({brand_id:req.query.brand_id},{include: [{model:'sneakers', as: 'sneakers'}],limit: 1})
      if(brand) sneakers = brand.sneakers
    }
    else{
      sneakers = await this.sneakersRepository.find(null,{})
    }

    let results = await this.Search.byName(req.query.query, sneakers)
    results = await Promise.all(results.map(async (el)=>{return await this.SneakerResource.toJson(el)}))
    res.json({total: results.length, results: results})
  }

  async show(req,res){
    const sneaker =await this.sneakersRepository.populate({sneaker_id:req.params.sneaker_id},{limit:1})
    if(!sneaker){
      res.json({total: 0, results: [] })
      return;
    }
    if(sneaker.needParsing()){
      sneaker.updateTimestamps()
      res.json({needParsing: true, hrefsCount: (await sneaker.getHrefs()).length, result: await this.SneakerExtendedResource.toJson(sneaker)})
    }
    else{
      res.json({needParsing: false, hrefsCount: (await sneaker.getHrefs()).length, result: await this.SneakerExtendedResource.toJson(sneaker)})
    }
  }

}

module.exports = SneakersController
