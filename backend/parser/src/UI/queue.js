var amqp = require('amqplib/callback_api');

class Queue{
  constructor({ config, collection }){
    this.config = config
    this.collection = collection
  }

  async listen(container){
    await this.establishChannel()
    await this.consumeMessages('messages')
  }

  async establishChannel(){
    let thisChannel
    await new Promise(function(res) {
      amqp.connect('amqp://default:secret@mq:5672', function(error, connection) {
        if(error){
          console.log(error);
        }
        else{
          console.log('listening');
        }
        connection.createChannel(function(error1, channel) {
          thisChannel = channel
          res()
        });
      });
    });
    this.channel = thisChannel
  }

  async consumeMessages(queue){
    this.channel.assertQueue(queue);
    this.channel.consume(queue, (msg)=>{
      this.collection.consume(msg)
    },{
      noAck: true
    })
  }
}

module.exports = Queue
