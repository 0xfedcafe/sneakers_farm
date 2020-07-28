const {createContainer, asValue, asClass, InjectionMode} = require('awilix')

const Queue = require('./UI/queue')
const Application = require('./App/app')
const Collection = require('./Infrastructure/collection')

const Parser = require('./Domain/Parser/index')
const ServerClient = require('./Domain/ServerClient/index')
const Updater = require('./Domain/Updater/index')

const ClassLoader = require('../utils/classLoader/index')
const StringTools = require('../utils/stringTools/index')
const Requester = require('../utils/requester/index')
const NameResolver = require('../utils/nameResolver/index')
const Logger = require('../utils/logger/index')
const Crypter = require('../utils/crypter/index')

const Farfetch = require('./Domain/Parser/shops/Farfetch')
const Flightclub = require('./Domain/Parser/shops/Flightclub')
const Goat = require('./Domain/Parser/shops/Goat')
const Klekt = require('./Domain/Parser/shops/Klekt')
const Solestage = require('./Domain/Parser/shops/Solestage')
const Solesupremacy = require('./Domain/Parser/shops/Solesupremacy')
const Stadiumgoods = require('./Domain/Parser/shops/Stadiumgoods')
const Stockx = require('./Domain/Parser/shops/Stockx')
const UrbanNecessities = require('./Domain/Parser/shops/UrbanNecessities')

const InfoModel = require('./UI/Resources/InfoModel')
const LinksModel = require('./UI/Resources/LinksModel')

const config = require('../config/keys')

const container = createContainer();
container.register({
  app: asClass(Application).singleton(),
  queue: asClass(Queue).singleton(),
  collection: asClass(Collection).singleton(),

  ClassLoader: asClass(ClassLoader).singleton(),
  StringTools: asClass(StringTools).singleton(),
  Requester: asClass(Requester).singleton(),
  NameResolver: asClass(NameResolver).singleton(),
  Logger: asClass(Logger).singleton(),
  crypter: asClass(Crypter).singleton(),

  Farfetch: asClass(Farfetch).singleton(),
  Flightclub: asClass(Flightclub).singleton(),
  Goat: asClass(Goat).singleton(),
  Klekt: asClass(Klekt).singleton(),
  Solestage: asClass(Solestage).singleton(),
  Solesupremacy: asClass(Solesupremacy).singleton(),
  Stadiumgoods: asClass(Stadiumgoods).singleton(),
  Stockx: asClass(Stockx).singleton(),
  UrbanNecessities: asClass(UrbanNecessities).singleton(),

  InfoModel: asClass(InfoModel).singleton(),
  LinksModel: asClass(LinksModel).singleton(),

  Parser: asClass(Parser).singleton(),
  ServerClient: asClass(ServerClient).singleton(),
  Updater: asClass(Updater).singleton(),

  config: asValue(config),
})

module.exports = container
