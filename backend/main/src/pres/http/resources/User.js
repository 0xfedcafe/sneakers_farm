
class User{
  constructor(){

  }

  async toJson(user){
    const result = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
    }

    return result
  }
}

module.exports = User
