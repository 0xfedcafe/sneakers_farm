
class LinksModel{
  constructor(){
  }

  toJson(body, sneakerId){
    return {
       links: body,
       sneakerId: sneakerId
    }
  }
}

module.exports = LinksModel
