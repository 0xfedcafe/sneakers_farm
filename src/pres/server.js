const app = require('express')()
const config = require('../../config/keys.js')
const bodyParser = require('body-parser')
const redis = require('socket.io-redis')
const server = require('http').Server(app)
import http from 'http'
import cors from 'cors'
import cookieSession from 'cookie-session'

class Server{
  constructor({ config, routes, channels }){
    this.config = config
    this.routes = routes
    this.server = server
    this.app = app
    this.channels = channels
  }

  async create(container){
    this.createHTTP(container)
    this.createTCP(container)
  }

  createHTTP(container){
    this.app
      .use(bodyParser.json())
      .use(cors())
      .use(
        cookieSession({
          maxAge: 30 * 24 * 60 * 60 * 1000,
          keys: [this.config.cookieKey]
        })
      )
      .use(this.routes.getRoutes())
  }

  createTCP(container){
    this.io = this.channels.register(this.server);
    //this.io.adapter(redis({ host: 'redis-12415.c77.eu-west-1-1.ec2.cloud.redislabs.com',port:12415,password:'qzPXKoScmvFeZ0q6axysShQWYcqAADUa' }))
  }

  async start(container){
    this.create(container)
    this.server.listen(this.config.server.port)
  }
}

export default Server
