import Page from './helpers/page'
import awilix from '../src/container'
import sneakerConfig from './config/sneakerConfig'
import assertions from './config/assertions'
import DefaultSneakerFactory from './factories/DefaultSneaker'


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


describe('When one sneaker exists',async()=>{
  beforeEach(async ()=>{
    const sneaker = await DefaultSneakerFactory(container)
  })

  afterEach(async ()=>{
    const sneaker = await container.sneakersRepository.find({sneaker_id:sneakerConfig.sneaker_id},{limit:1})
    await sneaker.removeGlobal()
  })

  describe('When authorization not required',async ()=>{
    test('One sneaker is returned by id', async ()=>{
      const result = await page.get('http://localhost:8000/sneakers/'+sneakerConfig.sneaker_id)
      expect(result).toMatchObject(assertions.extended)
    }),

    test('Search results are returned', async ()=>{
      const result = await page.get('http://localhost:8000/sneakers/search?query='+sneakerConfig.sneaker_id)
      expect(result).toMatchObject(assertions.search)
    })

    test('Brands are returned', async ()=>{
      const result = await page.get('http://localhost:8000/sneakers/brands')
      expect(result).toMatchObject(assertions.brands)
    })

    test('Sets are returned', async ()=>{
      const result = await page.get('http://localhost:8000/sneakers/sets/1')
      expect(result).toMatchObject(assertions.sets)
    })
  })
})
