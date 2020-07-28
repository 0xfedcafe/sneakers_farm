const sneakerConfig = require('../config/sneakerConfig')

module.exports = async (container) =>{
  const description = await container.descriptionsRepository.create(sneakerConfig.description)
  const brand = await container.brandsRepository.create(sneakerConfig.brands[0])
  const model = await container.modelsRepository.create(sneakerConfig.model,{brand:brand})


  const extended = await container.extendedsRepository.create(sneakerConfig.extended)
  const image = await container.imagesRepository.create(sneakerConfig.image)

  const price1 = await container.pricesRepository.create(sneakerConfig.prices[0])
  const price2 = await container.pricesRepository.create(sneakerConfig.prices[0])
  const price3 = await container.pricesRepository.create(sneakerConfig.prices[0])

  const href1 = await container.hrefsRepository.create()
  const href2 = await container.hrefsRepository.create()
  const href3 = await container.hrefsRepository.create()

   return await container.sneakersRepository.create({sneaker_id:sneakerConfig.sneaker_id, colorway: sneakerConfig.colorway, addition: sneakerConfig.addition},
     {description: description, brands: [brand], model: model, extended: extended, image:image,prices: [price1,price2,price3], hrefs: [href1,href2,href3]})
}
