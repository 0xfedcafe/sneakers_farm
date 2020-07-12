const Telegraf = require('telegraf')
const session = require('telegraf/session')
const app = require('express')()
const bodyParser = require('body-parser')
const axios = require('axios').default
const config = require('./config/keys.js')
app.use(bodyParser.json())

const token = '1114342384:AAFsgLyEp6dnNu9CQ3qQitDFbxd1bQVrFug'


const bot = new Telegraf(token);
bot.use(session())

app.post('/log',(req,res,error)=>{
  bot.telegram.sendMessage(config.logId, req.body.message)
  res.end()
})

app.post('/error',(req,res,error)=>{
  bot.telegram.sendMessage(config.errorId, req.body.message)
  res.end()
})

bot.command('delete', (ctx) => {
    ctx.session.delete = true
    ctx.reply('type id')
})

bot.command('parse', (ctx) => {
    ctx.session.parse = true
    ctx.reply('type id')
})

bot.command('search', (ctx) => {
    ctx.session.search = true
    ctx.reply('type query')
})

bot.on('message',async (ctx) => {
    if(ctx.session.delete){
      post('/delete',{indexes: [ctx.message.text]})
      ctx.reply('Sent')
      ctx.session.delete = false
    }
    else if(ctx.session.parse){
      post('/parse',{indexes: [ctx.message.text]})
      ctx.reply('Sent')
      ctx.session.parse = false
    }
    else if(ctx.session.search){
      const res = await get('/search',{query: ctx.message.text})
      console.log(res);
      for(var sneaker of res.results){
        ctx.reply(sneaker.sneaker_id+' '+sneaker.colorway)
      }
    }
    else{
      ctx.reply('use commands')
      ctx.session.parse = false
      ctx.session.delete = false
      ctx.session.search = false
    }
})

async function post(url,body){
  try {
    return axios.post(config.serverUrl+url, body )
  } catch (e) {
    console.log(e);
  }
}

async function get(url,params){
  try {
    return (await axios.get(config.serverUrl+url, { params })).data
  } catch (e) {
    console.log(e);
  }
}

bot.launch()

app.listen(config.port)
