import mongoose from 'mongoose'

class MongooseRepository{

  async count(){
    return this.collection.estimate
  }

  async find(query = {},{multiple = true}){
    const results = multiple
      ? this.collection.find(query)
      : this.collection.findOne(query)

    return results
  }

  async create(body){
    body.id =  mongoose.Types.ObjectId(body.id)
    const document = new this.collection(body)

    return document.save()
  }

  async update(body){
    return this.collection.findByIdAndUpdate(document,body);
  }

  async remove(document){
    return document.remove();
  }
}
