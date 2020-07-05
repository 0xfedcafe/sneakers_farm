import puppeteer from 'puppeteer'
import sessionFactory from '../factories/Session'

class Page {
  static async build(){
    const browser = await puppeteer.launch({
      headless:false
    })

    const page = await browser.newPage()
    await page.setBypassCSP(true);
    const customPage = new Page(page)

    return new Proxy(customPage,{
      get: function(target,property){
        return browser[property] || customPage[property] || page[property]
      }
    })
  }

  constructor(page){
    this.page = page
  }

  async login(user){
    await this.page.goto('http://localhost:8000')
    const {session,sig} = sessionFactory(user)

    await this.page.setCookie({name:'express:sess',value: session})
    await this.page.setCookie({name:'express:sess.sig',value: sig})
  }

  async logout(user){
    await this.page.deleteCookie({name:'express:sess'})
    await this.page.deleteCookie({name:'express:sess.sig'})
  }

  get(path){
    return this.page.evaluate((_path)=>{
      return fetch(_path,{
        method: "GET",
        credentials: 'same-origin',
        headers:{
          'Content-Type' : 'application/json'
        }
      }).then(res=>res.json())
    },path)
  }

  post(path,data){
    return this.page.evaluate((_path,_data)=>{
      return fetch(_path,{
        method: "POST",
        credentials: 'same-origin',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(_data)
      }).then(res=>res.json())
    },path,data)
  }
}

export default Page;
