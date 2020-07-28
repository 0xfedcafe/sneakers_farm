
class Application{
  constructor({queue}){
    this.queue = queue
  }

  async start(container){
    await this.queue.listen(container)
  }
}

module.exports = Application
