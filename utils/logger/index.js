import request from 'request'
import config from '../../config/keys.js'
class Logger{
  error(message){
    request.post({url:config.logUrl + '/error',headers: {'Content-Type':'application/json'},body:JSON.stringify({message:message})})
  }

  log(message){
    request.post({url:config.logUrl + '/log',headers: {'Content-Type':'application/json'},body:JSON.stringify({message:message})})
  }
}

export default Logger
