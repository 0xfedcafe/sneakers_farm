const  crypto = require('crypto')

class AuthController{

  constructor({ usersRepository, UserResourse, crypter }){
    this.usersRepository = usersRepository
    this.UserResourse = UserResourse
    this.crypter = crypter
  }

  async signUp(req,res){
    const user = await this.usersRepository.find({email: req.body.email},{limit:1})

    if(user){
      if(this.crypter.verify(req.body.password,user.salt,user.password)){
        req.session.user_id = user.user_id
        res.status(200).json({status: "logged in"})
      }
      else{
        res.status(401).json({status: "invalid password"})
      }
      return;
    }

    const newUser = await this.usersRepository.create({
      name: req.body.name,
      email: req.body.email,
      password:req.body.password,
    })

    res.status(201).json({
      user:{
        name: newUser.name,
        email: newUser.email,
      }
    })
  }

  async signIn(req,res){
    const user = await this.usersRepository.find({email: req.body.email},{limit:1})

    if(user){
      if(this.crypter.verify(req.body.password,user.salt,user.password)){
        req.session.user_id = user.user_id
        res.status(200).send(JSON.stringify({message: "logged in"}))
      }
      else{
        res.status(401).send(JSON.stringify({message: "invalid password"}))
      }
      return;
    }
    else{
      res.status(401).send(JSON.stringify({message: "invalid email"}))
    }
  }

  async logOut(req,res){
    req.session.user_id = undefined
    res.status(200).json({message: "logged out"})
  }

  async getUser(req,res){
    res.status(200).json({user: await this.UserResourse.toJson(req.user)})
  }

}

module.exports = AuthController
