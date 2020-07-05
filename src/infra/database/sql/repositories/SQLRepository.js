import mongoose from 'mongoose'

class SQLRepository{

  async count(){
    return this.model.count()
  }

  async find(query = null,{ attributes = null, limit = null, order = null}){
    const results = await this.model.findAll({
        where: query,
        attributes: attributes,
        order: order,
        limit: limit
    })

    if(limit==1){
      return results[0]
    }
    else{
      return results
    }
  }

  async create(body){
    return await this.model.create(body)
  }

  async findOrCreate(body){
    return (await this.model.findOrCreate({where : body}))[0]
  }

  async remove(document){
    if(document)
      return await document.destroy();
    else return null
  }

  async delete(body){
    await this.model.destroy({where: body});
  }

  async batchRemove(params){
    return await this.model.destroy(params);
  }

  async batchCreate(params){
   for(let body of params){
     await this.create(body)
   }
  }

  async save(document){
    return document.save();
  }
}

export default SQLRepository
