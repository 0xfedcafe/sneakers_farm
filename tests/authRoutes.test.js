import Page from './helpers/page'
import awilix from '../src/container'
import assertions from './config/assertions'
import userConfig from './config/userConfig'
import DefaultUserFactory from './factories/DefaultUser'


const container = awilix.cradle
const Boostrap = container.Boostrap
Boostrap.assosiate()
Boostrap.loadClasses()

let page;

beforeEach(async ()=>{
  page = await Page.build()
})

afterEach(async ()=>{
  await page.close()
})


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
    const result = await page.get('http://localhost:8000/auth/log_out')
    expect(result).toMatchObject(assertions.log_out)
  })

  test('User can get his info',async ()=>{
    const result = await page.get('http://localhost:8000/auth/user')
    expect(result).toHaveProperty('user')
    expect(result.user).toHaveProperty('name')
    expect(result.user).toHaveProperty('email')
  })
})

describe('When authorization dont required',async ()=>{

  test('User can sign up',async ()=>{
    const result = await page.post('http://localhost:8000/auth/sign_up',userConfig)
    expect(result).toMatchObject(assertions.sign_up)
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
    const result = await page.post('http://localhost:8000/auth/sign_in',{email: userConfig.email, password: userConfig.password})
    expect(result).toMatchObject(assertions.sign_in)
  })
})
