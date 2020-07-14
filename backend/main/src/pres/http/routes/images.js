const app = require('express')()
var path = require('path')

class ImageRoutes{

  getRoutes(){
    app.get('/Farfetch.com',async (req,res)=>{

      res.sendFile(path.join(__dirname, '../files/Farfetch.svg'))
    })

    app.get('/Flightclub.com',async (req,res)=>{

      res.sendFile(path.join(__dirname, '../files/Flightclub.svg'))
    })

    app.get('/Goat.com',async (req,res)=>{

      res.sendFile(path.join(__dirname, '../files/Goat.svg'))
    })

    app.get('/Klekt.com',async (req,res)=>{

      res.sendFile(path.join(__dirname, '../files/Klekt.svg'))
    })

    app.get('/Solestage.com',async (req,res)=>{

      res.sendFile(path.join(__dirname, '../files/Solestage.svg'))
    })

    app.get('/Solesupremacy.com',async (req,res)=>{

      res.sendFile(path.join(__dirname, '../files/Solesupremacy.svg'))
    })

    app.get('/Stadiumgoods.com',async (req,res)=>{

      res.sendFile(path.join(__dirname, '../files/Farfetch.svg'))
    })

    app.get('/Stockx.com',async (req,res)=>{

      res.sendFile(path.join(__dirname, '../files/Stockx.svg'))
    })

    app.get('/UrbanNecessities.com',async (req,res)=>{

      res.sendFile(path.join(__dirname, '../files/Urbannecessities.svg'))
    })
    return app
  }
}

module.exports = ImageRoutes
