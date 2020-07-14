
class Model{
  constructor( {SneakerResource} ){
    this.SneakerResource = SneakerResource;
  }

  async toJson(model){
    const sneaker = await model.getOneSneaker()
    return {
      name: model.name,
      model_id: model.model_id,
      sneaker: await this.SneakerResource.toJson(sneaker)
    }
  }
}

module.exports = Model
