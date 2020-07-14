const postValidate = require('./middleware/PostValidation')
const getValidate = require('./middleware/GetValidation')
const sneakersSchemas = require('./validation/sneakers')
const app = require('express')();

class BotRoutes{
  constructor({botController}){
    this.botController = botController
  }

  getRoutes(){
    app.post('/delete', postValidate(sneakersSchemas.parse), async (req,res)=>{
      await this.botController.delete(req,res)
    })

    app.post('/parse', postValidate(sneakersSchemas.parse), async (req,res)=>{
      await this.botController.parse(req,res)
    })

    app.get('/search', postValidate(sneakersSchemas.search), async (req,res)=>{
      await this.botController.search(req,res)
    })

    app.get('/index',async (req,res)=>{
      await this.botController.index(req,res)
    })


    return app
  }
}

module.exports = BotRoutes
