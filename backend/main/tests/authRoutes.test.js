const Page = require('./helpers/page')
const awilix = require('../src/container')
const assertions = require('./config/assertions')
const userConfig = require('./config/userConfig')
const config = require('./config/keys')
const DefaultUserFactory = require('./factories/DefaultUser')


const container = awilix.cradle
const Boostrap = container.Boostrap
Boostrap.assosiate()
Boostrap.loadClasses()

let page = new Page()

describe('When authorization required',async ()=>{
  beforeEach(async ()=>{
    const user = await DefaultUserFactory(container)
    await page.login(user)
  })

  afterEach(async ()=>{
    const user = await container.usersRepository.find(null,{limit:1})
    await container.usersRepository.remove(user)
    await page.logout()
  })

  test('User can log out',async ()=>{
    const {data} = await page.get(config.serverUrl + '/auth/log_out')
    expect(data).toMatchObject(assertions.log_out)
  })

  test('User can get his info',async ()=>{
    const {data} = await page.get(config.serverUrl + '/auth/user')
    expect(data).toHaveProperty('user')
    expect(data.user).toHaveProperty('name')
    expect(data.user).toHaveProperty('email')
  })
})

describe('When authorization dont required',async ()=>{

  test('User can sign up',async ()=>{
    const {data} = await page.post(config.serverUrl + '/auth/sign_up',userConfig)
    expect(data).toMatchObject(assertions.sign_up)
  })

  afterEach(async ()=>{
    const user = await container.usersRepository.find(null,{limit:1})
    await container.usersRepository.remove(user)
  })

})

describe('When user is signed up',async ()=>{
  beforeEach(async ()=>{
    const user = await DefaultUserFactory(container)
  })

  afterEach(async ()=>{
    const user = await container.usersRepository.find(null,{limit:1})
    await container.usersRepository.remove(user)
  })

  test('User can sign in',async ()=>{
    const {data} = await page.post(config.serverUrl + '/auth/sign_in',{email: userConfig.email, password: userConfig.password})
    expect(data).toMatchObject(assertions.sign_in)
  })
})
