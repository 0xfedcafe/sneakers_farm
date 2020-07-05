
class Set{
  constructor( {SneakerResource} ){
    this.SneakerResource = SneakerResource;
  }

  async toJson(set){
    const sneaker = await set.getOneSneaker()
    return {
      name: set.name,
      set_id: set.set_id,
      sneaker: await this.SneakerResource.toJson(sneaker)
    }
  }
}

export default Set
