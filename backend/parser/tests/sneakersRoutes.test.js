const awilix = require('../src/container')
const sneakerConfig = require('./config/sneakerConfig')
const assertions = require('./config/assertions')
const DefaultSneakerFactory = require('./factories/DefaultSneaker')
const axios = require('axios').default
const config = require('./config/keys')


const container = awilix.cradle
const Boostrap = container.Boostrap
Boostrap.assosiate()
Boostrap.loadClasses()

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
      const {data} = await axios.get(config.serverUrl + '/sneakers/'+sneakerConfig.sneaker_id)
      expect(data).toMatchObject(assertions.extended)
    }),

    test('Search results are returned', async ()=>{
      const {data} = await axios.get(config.serverUrl + '/sneakers/search?query='+sneakerConfig.sneaker_id)
      expect(data).toMatchObject(assertions.search)
    })

    test('Brands are returned', async ()=>{
      const {data} = await axios.get(config.serverUrl + '/sneakers/brands')
      expect(data).toMatchObject(assertions.brands)
    })

    test('Sets are returned', async ()=>{
      const {data} = await axios.get(config.serverUrl + '/sneakers/models/1')
      expect(data).toMatchObject(assertions.models)
    })
  })
})
