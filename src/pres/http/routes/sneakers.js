import postValidate from './middleware/PostValidation'
import getValidate from './middleware/GetValidation'
import sneakersSchemas from './validation/sneakers'
const app = require('express')();

class SneakersRoutes{
  constructor({sneakersController}){
    this.sneakersController = sneakersController
  }

  getRoutes(){


    app.get('/brands',async (req,res)=>{
      await this.sneakersController.getBrands(req,res)
    })

    app.get('/sets/:brand_id',async (req,res)=>{
      await this.sneakersController.getSets(req,res)
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

export default SneakersRoutes
