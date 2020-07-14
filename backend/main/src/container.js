const {createContainer, asValue, asClass, InjectionMode} = require('awilix')

const Server = require('./pres/server')
const ManageDb = require('./infra/database/index')
const Application = require('./app/app')

const Parser = require('./domain/services/parserService/Parser')
const Search = require('./domain/services/searchService/Search')
const Updater = require('./domain/services/updateService/Updater')

const ClassLoader = require('../utils/classLoader/index')
const StringTools = require('../utils/stringTools/index')
const Requester = require('../utils/requester/index')
const NameResolver = require('../utils/nameResolver/index')
const Logger = require('../utils/logger/index')
const Crypter = require('../utils/crypter/index')

const UserResourse = require('./pres/http/resources/User')
const PriceResource = require('./pres/http/resources/Price')
const BrandResource = require('./pres/http/resources/Brand')
const ModelResource = require('./pres/http/resources/Model')
const SneakerResource = require('./pres/http/resources/Sneaker')
const SneakerExtendedResource = require('./pres/http/resources/SneakerExtended')

const Farfetch = require('./domain/services/parserService/shops/Farfetch')
const Flightclub = require('./domain/services/parserService/shops/Flightclub')
const Goat = require('./domain/services/parserService/shops/Goat')
const Klekt = require('./domain/services/parserService/shops/Klekt')
const Solestage = require('./domain/services/parserService/shops/Solestage')
const Solesupremacy = require('./domain/services/parserService/shops/Solesupremacy')
const Stadiumgoods = require('./domain/services/parserService/shops/Stadiumgoods')
const Stockx = require('./domain/services/parserService/shops/Stockx')
const UrbanNecessities = require('./domain/services/parserService/shops/UrbanNecessities')

const SneakerDomain = require('./domain/sneaker')
const DescriptionDomain = require('./domain/description')
const BrandDomain = require('./domain/brand')
const ModelDomain = require('./domain/model')
const ImageDomain = require('./domain/image')
const ExtendedDomain = require('./domain/extended')
const PriceDomain = require('./domain/price')
const HrefDomain = require('./domain/href')
const UserDomain = require('./domain/user')
const ShelfDomain = require('./domain/shelf')

const Boostrap = require('./infra/database/sql/Boostrap')
const Sneaker = require('./infra/database/sql/models/Sneaker')
const Description = require('./infra/database/sql/models/Description')
const Brand = require('./infra/database/sql/models/Brand')
const Model = require('./infra/database/sql/models/Model')
const Image = require('./infra/database/sql/models/Image')
const Price = require('./infra/database/sql/models/Price')
const Extended = require('./infra/database/sql/models/Extended')
const Href = require('./infra/database/sql/models/Href')
const User = require('./infra/database/sql/models/User')
const Shelf = require('./infra/database/sql/models/Shelf')

const SneakersRepository = require('./infra/database/sql/repositories/SneakersRepository')
const DescriptionsRepository = require('./infra/database/sql/repositories/DescriptionsRepository')
const BrandsRepository = require('./infra/database/sql/repositories/BrandsRepository')
const ModelsRepository = require('./infra/database/sql/repositories/ModelsRepository')
const ImagesRepository = require('./infra/database/sql/repositories/ImagesRepository')
const PricesRepository = require('./infra/database/sql/repositories/PricesRepository')
const ExtendedsRepository = require('./infra/database/sql/repositories/ExtendedsRepository')
const HrefsRepository = require('./infra/database/sql/repositories/HrefsRepository')
const UsersRepository = require('./infra/database/sql/repositories/UsersRepository')
const ShelfsRepository = require('./infra/database/sql/repositories/ShelfsRepository')

const SneakersController = require('./pres/http/controllers/SneakersController')
const AuthController = require('./pres/http/controllers/AuthController')
const BotController = require('./pres/http/controllers/BotController')

const Channels = require('./pres/tcp/channels/index')
const SneakersChannel = require('./pres/tcp/channels/SneakersChannel')

const Routes = require('./pres/http/routes/index')
const ImageRoutes = require('./pres/http/routes/images')
const SneakersRoutes = require('./pres/http/routes/sneakers')
const AuthRoutes = require('./pres/http/routes/auth')
const BotRoutes = require('./pres/http/routes/bot')

const config = require('../config/keys')
const sequelize = require('../config/sequelize')

const container = createContainer();
container.register({
  app: asClass(Application).singleton(),
  db: asClass(ManageDb).singleton(),
  server: asClass(Server).singleton(),

  Farfetch: asClass(Farfetch).singleton(),
  Flightclub: asClass(Flightclub).singleton(),
  Goat: asClass(Goat).singleton(),
  Klekt: asClass(Klekt).singleton(),
  Solestage: asClass(Solestage).singleton(),
  Solesupremacy: asClass(Solesupremacy).singleton(),
  Stadiumgoods: asClass(Stadiumgoods).singleton(),
  Stockx: asClass(Stockx).singleton(),
  UrbanNecessities: asClass(UrbanNecessities).singleton(),

  SneakerDomain: asClass(SneakerDomain).singleton(),
  DescriptionDomain: asClass(DescriptionDomain).singleton(),
  BrandDomain: asClass(BrandDomain).singleton(),
  ModelDomain: asClass(ModelDomain).singleton(),
  ExtendedDomain: asClass(ExtendedDomain).singleton(),
  ImageDomain: asClass(ImageDomain).singleton(),
  PriceDomain: asClass(PriceDomain).singleton(),
  HrefDomain: asClass(HrefDomain).singleton(),
  UserDomain: asClass(UserDomain).singleton(),
  ShelfDomain: asClass(ShelfDomain).singleton(),

  Boostrap: asClass(Boostrap).singleton(),

  Sneaker: asClass(Sneaker).singleton(),
  Description: asClass(Description).singleton(),
  Brand: asClass(Brand).singleton(),
  Model: asClass(Model).singleton(),
  Image: asClass(Image).singleton(),
  Price: asClass(Price).singleton(),
  Extended: asClass(Extended).singleton(),
  Href: asClass(Href).singleton(),
  User: asClass(User).singleton(),
  Shelf: asClass(Shelf).singleton(),

  sneakersRepository: asClass(SneakersRepository).singleton(),
  descriptionsRepository: asClass(DescriptionsRepository).singleton(),
  brandsRepository: asClass(BrandsRepository).singleton(),
  modelsRepository: asClass(ModelsRepository).singleton(),
  imagesRepository: asClass(ImagesRepository).singleton(),
  pricesRepository: asClass(PricesRepository).singleton(),
  extendedsRepository: asClass(ExtendedsRepository).singleton(),
  hrefsRepository: asClass(HrefsRepository).singleton(),
  usersRepository: asClass(UsersRepository).singleton(),
  shelfsRepository: asClass(ShelfsRepository).singleton(),

  sneakersController: asClass(SneakersController).singleton(),
  authController: asClass(AuthController).singleton(),
  botController: asClass(BotController).singleton(),

  sneakersChannel: asClass(SneakersChannel).singleton(),
  channels: asClass(Channels).singleton(),

  sneakersRoutes: asClass(SneakersRoutes).singleton(),
  authRoutes: asClass(AuthRoutes).singleton(),
  botRoutes: asClass(BotRoutes).singleton(),
  imageRoutes: asClass(ImageRoutes).singleton(),
  routes: asClass(Routes).singleton(),

  ClassLoader: asClass(ClassLoader).singleton(),
  StringTools: asClass(StringTools).singleton(),
  Requester: asClass(Requester).singleton(),
  NameResolver: asClass(NameResolver).singleton(),
  Logger: asClass(Logger).singleton(),
  crypter: asClass(Crypter).singleton(),

  Parser: asClass(Parser).singleton(),
  Search: asClass(Search).singleton(),
  Updater: asClass(Updater).singleton(),

  UserResourse: asClass(UserResourse).singleton(),
  PriceResource: asClass(PriceResource).singleton(),
  BrandResource: asClass(BrandResource).singleton(),
  ModelResource: asClass(ModelResource).singleton(),
  SneakerResource: asClass(SneakerResource).singleton(),
  SneakerExtendedResource: asClass(SneakerExtendedResource).singleton(),

  config: asValue(config),
  sequelize: asClass(sequelize)
})

module.exports = container
