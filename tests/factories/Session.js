import config from '../../config/keys'
const Buffer = require('safe-buffer').Buffer
const Keygrip = require('keygrip')
const keygrip = new Keygrip([config.cookieKey])

export default (user)=>{
  const sessionObject  = {
    user_id: user.user_id
  }

  const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64')
  const sig = keygrip.sign('express:sess='+session)

  return {session,sig}
}
