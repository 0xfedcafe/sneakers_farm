const postValidate = require('./middleware/PostValidation')
const getValidate = require('./middleware/GetValidation')
const addUser = require('./middleware/AddUser')
const authSchemas = require('./validation/auth')

const app = require('express')();

class AuthRoutes{
  constructor({authController, usersRepository}){
    this.authController = authController
    this.usersRepository = usersRepository
  }

  getRoutes(){
    app.post('/sign_up', postValidate(authSchemas.sign_up), async (req,res)=>{
      await this.authController.signUp(req,res)
    })

    app.post('/sign_in', postValidate(authSchemas.sign_in), async (req,res)=>{
      await this.authController.signIn(req,res)
    })

    app.get('/log_out', addUser(this.usersRepository), async (req,res)=>{
      await this.authController.logOut(req,res)
    })

    app.get('/user', addUser(this.usersRepository), async (req,res)=>{
      await this.authController.getUser(req,res)
    })

    return app
  }
}

module.exports = AuthRoutes
