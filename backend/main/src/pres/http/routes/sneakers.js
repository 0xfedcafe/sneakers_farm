const postValidate = require('./middleware/PostValidation')
const getValidate = require('./middleware/GetValidation')
const sneakersSchemas = require('./validation/sneakers')
const app = require('express')();

class SneakersRoutes{
  constructor({sneakersController}){
    this.sneakersController = sneakersController
  }

  getRoutes(){


    app.get('/brands',async (req,res)=>{
      await this.sneakersController.getBrands(req,res)
    })

    app.get('/models/:brand_id',async (req,res)=>{
      await this.sneakersController.getModels(req,res)
    })

    app.get('/search',getValidate(sneakersSchemas.search),async (req,res)=>{
      await this.sneakersController.search(req,res)
    })

    app.get('/:sneaker_id',async (req,res)=>{
      await this.sneakersController.show(req,res)
    })

    return app
  }
}

module.exports = SneakersRoutes
