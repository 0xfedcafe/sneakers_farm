const app = require('express')();

class Routes{
  constructor({sneakersRoutes, authRoutes, botRoutes, imageRoutes}){
    this.authRoutes = authRoutes
    this.sneakersRoutes = sneakersRoutes
    this.botRoutes = botRoutes
    this.imageRoutes = imageRoutes
  }

  getRoutes(){
    app.use('/sneakers',this.sneakersRoutes.getRoutes())
    app.use('/auth',this.authRoutes.getRoutes())
    app.use('/bot',this.botRoutes.getRoutes())
    app.use('/images',this.imageRoutes.getRoutes())

    app.all('*',(req,res)=>{
      console.log('here');
      res.status(404).send({msg:'error'})
    })

    return app
  }
}

module.exports = Routes
