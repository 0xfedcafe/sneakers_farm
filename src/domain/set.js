class Line {

  constructor({ sneakersRepository}){
    this.sneakersRepository = sneakersRepository
  }

  async getOneSneaker(){
    return await this.sneakersRepository.find(null,{limit:1})
  }

}

export default  Line;
