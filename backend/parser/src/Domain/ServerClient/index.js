const request = require('request')

class ServerClient{
  constructor({ config }){
    this.config = config
  }

  request(body){
    console.log(body);
    request({
      method: 'POST',
      url: this.config.serverUrl,
      body: JSON.stringify(body)
    })
  }
}

module.exports = ServerClient;
