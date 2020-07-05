
class SneakersRepository extends MongooseRepository{

  constructor({sneaker}){
    this.collection = sneaker
  }

}
