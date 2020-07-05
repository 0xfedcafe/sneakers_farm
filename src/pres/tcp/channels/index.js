const io = require('socket.io')

class Channels{
  constructor({sneakersChannel, Logger}){
    this.sneakersChannel = sneakersChannel
    this.Logger = Logger
  }

  register(server){
    const sneakersChannel = this.sneakersChannel
    const Logger = this.Logger
    this.io = io(server)

    this.io.sockets.on('connection', function (socket) {
      socket.on('sneaker',async (data)=> {
        sneakersChannel.resolvePrices(data,socket)
      })

    })

    return this.io
  }
}

export default Channels
