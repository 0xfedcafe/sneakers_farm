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


describe('When user is signed up',async ()=>{
  beforeEach(async ()=>{
    const user = await DefaultUserFactory(container)
  })

  afterEach(async ()=>{
    const users = await container.usersRepository.find(null)
    for(var u of users){
      await container.usersRepository.remove(u)
    }
  })

  test('Sneaker is parsed',async ()=>{

  })
})
