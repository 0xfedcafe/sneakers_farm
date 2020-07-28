const sessionFactory = require('../factories/Session')
const request = require('request-promise')
const axios = require('axios').default

class Page {

  async login(user){
    const {session,sig} = sessionFactory(user)

    this.sess = session
    this.sig = sig
  }

  async logout(user){
    this.sess = null
    this.sig = null
  }

  async get(path){
    if(this.sess && this.sig){
      const cookie = "express:sess=" + this.sess + "; express:sess.sig=" + this.sig
      let response =  await request({
        method: 'GET',
        url: path,
        headers:{
          cookie: cookie
        }
      })
      return {data: JSON.parse(response)}
    }
    else return await axios.get(path)
  }

  async post(path,body){
    if(this.sess && this.sig){
      const cookie = "express:sess=" + this.sess + "; express:sess.sig=" + this.sig
       const response = await request({
        method: 'POST',
        url: path,
        body: JSON.stringify(body),
        headers:{
          cookie: cookie
        }
      })
      return {data: JSON.parse(response)}
    }
    else return await axios.post(path,body)
  }
}

module.exports = Page;
