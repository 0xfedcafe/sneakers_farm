const cheerio = require('cheerio')
const request = require('request')

class Requester{

  constructor({ config, Logger }){
    this.config = config
    this.Logger = Logger
    this.args = [
      { proxy : false, headers : false, render : false, premium : false, chromium : false },
      { proxy : true, headers : false, render : false, premium : false, chromium : false },
      { proxy : false, headers : false, render : true, premium : false, chromium : false },
      //{ proxy : false, headers : false, render : false, premium : false, chromium : true },
      // { proxy : false, headers : false, render : false, premium : true, chromium : false },
    ]
  }


  async get(options){
    for(var i=0; i<this.args.length; i++){
      const arg = this.args[i]
      if(i>=this.args.length-1)this.Logger.error('Requester reached last proxy')
      options = this.assembleOptions(options,arg)

      if(options.headers)
        arg.headers = true

      const html = await this.getHtml(options)

      if(!this.isBanned(html))
        return html
      else
        if(i>=this.args.length-1)this.Logger.error('Requester failed')
    }
  }

  assembleOptions(options,{ proxy = false, headers = false, render = false, premium = false, chromium = false }){
    if(proxy){
      options.url = this.config.proxy + options.url
      headers ? options.url += '&keep_headers=true' : options.url
      render ? options.url += '&render=true' : options.url
      premium ? options.url += '&premium=true' : options.url
    }
    if(chromium){
      options.url = 'https://us-central1-top-operand-267416.cloudfunctions.net/function-1?link=' + options.url
    }

    return options
  }

  async getHtml(options){
    const Logger = this.Logger

    let response
    await new Promise(resolve=>{
      const r = request(options, (err,res,body)=>{
          response = body
          resolve()
      })
      setTimeout(function () {
        if(!response){
          Logger.error('Requester aborted')
          response = null
          r.abort()
          resolve()
        }
      }, this.config.timeout);
    })

    return response
  }

  isBanned(html){
    if(html=='undefined' || html==undefined || html.search('{"errors":[{"403":"cloudflare captcha"}]}')>=0){
      return true
    }
    const $ = cheerio.load(html);
    if($('title').text() =="Access to this page has been denied."  || $('title').text()=="Flight Club - Confirm" || $('title').text()=="Forbidden"
     || $('title').text()=="Attention Required! | Cloudflare" ){
      return true;
    }
    else if(html.search("captcha")<20 && html.search("captcha")>=0){
      return true;
    }
    else return false;
  }

}

module.exports = Requester
