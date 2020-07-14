const crypto = require('crypto');

class Crypter{
  getSalt(){
    return crypto.randomBytes(16).toString('hex');
  }

  getHash(password,salt){
    return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
  }

  verify(password,salt,hash){
    var newHash = this.getHash(password,salt)
    return newHash === hash;
  }
}

module.exports = Crypter
