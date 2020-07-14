class Model {

  constructor({ sneakersRepository}){
    this.sneakersRepository = sneakersRepository
  }

  async getOneSneaker(){
    return await this.sneakersRepository.find(null,{limit:1})
  }

}

module.exports =  Model;
