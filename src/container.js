import {createContainer, asValue, asClass, InjectionMode} from 'awilix'

import Server from './pres/server'
import ManageDb from './infra/database/index'
import Application from './app/app'

import Parser from './domain/services/parserService/Parser'
import Search from './domain/services/searchService/Search'
import Updater from './domain/services/updateService/Updater'

import ClassLoader from '../utils/classLoader/index'
import StringTools from '../utils/stringTools/index'
import Requester from '../utils/requester/index'
import NameResolver from '../utils/nameResolver/index'
import Logger from '../utils/logger/index'

import UserResourse from './pres/http/resources/User'
import BrandResource from './pres/http/resources/Brand'
import SetResource from './pres/http/resources/Set'
import SneakerResource from './pres/http/resources/Sneaker'
import SneakerExtendedResource from './pres/http/resources/SneakerExtended'

import Farfetch from './domain/services/parserService/shops/Farfetch'
import Flightclub from './domain/services/parserService/shops/Flightclub'
import Goat from './domain/services/parserService/shops/Goat'
import Klekt from './domain/services/parserService/shops/Klekt'
import Solestage from './domain/services/parserService/shops/Solestage'
import Solesupremacy from './domain/services/parserService/shops/Solesupremacy'
import Stadiumgoods from './domain/services/parserService/shops/Stadiumgoods'
import Stockx from './domain/services/parserService/shops/Stockx'
import UrbanNecessities from './domain/services/parserService/shops/UrbanNecessities'

import SneakerDomain from './domain/sneaker'
import DescriptionDomain from './domain/description'
import BrandDomain from './domain/brand'
import SetDomain from './domain/set'
import ImageDomain from './domain/image'
import ExtendedDomain from './domain/extended'
import PriceDomain from './domain/price'
import HrefDomain from './domain/href'
import UserDomain from './domain/user'

import Boostrap from './infra/database/sql/Boostrap'
import Sneaker from './infra/database/sql/models/Sneaker'
import Description from './infra/database/sql/models/Description'
import Brand from './infra/database/sql/models/Brand'
import Set from './infra/database/sql/models/Set'
import Image from './infra/database/sql/models/Image'
import Price from './infra/database/sql/models/Price'
import Extended from './infra/database/sql/models/Extended'
import Href from './infra/database/sql/models/Href'
import User from './infra/database/sql/models/User'

import SneakersRepository from './infra/database/sql/repositories/SneakersRepository'
import DescriptionsRepository from './infra/database/sql/repositories/DescriptionsRepository'
import BrandsRepository from './infra/database/sql/repositories/BrandsRepository'
import SetsRepository from './infra/database/sql/repositories/SetsRepository'
import ImagesRepository from './infra/database/sql/repositories/ImagesRepository'
import PricesRepository from './infra/database/sql/repositories/PricesRepository'
import ExtendedsRepository from './infra/database/sql/repositories/ExtendedsRepository'
import HrefsRepository from './infra/database/sql/repositories/HrefsRepository'
import UsersRepository from './infra/database/sql/repositories/UsersRepository'

import SneakersController from './pres/http/controllers/SneakersController'
import AuthController from './pres/http/controllers/AuthController'
import BotController from './pres/http/controllers/BotController'

import Channels from './pres/tcp/channels/index'
import SneakersChannel from './pres/tcp/channels/SneakersChannel'

import Routes from './pres/http/routes/index'
import ImageRoutes from './pres/http/routes/images'
import SneakersRoutes from './pres/http/routes/sneakers'
import AuthRoutes from './pres/http/routes/auth'
import BotRoutes from './pres/http/routes/bot'

import config from '../config/keys'
import sequelize from '../config/sequelize'

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
  SetDomain: asClass(SetDomain).singleton(),
  ExtendedDomain: asClass(ExtendedDomain).singleton(),
  ImageDomain: asClass(ImageDomain).singleton(),
  PriceDomain: asClass(PriceDomain).singleton(),
  HrefDomain: asClass(HrefDomain).singleton(),
  UserDomain: asClass(UserDomain).singleton(),

  Boostrap: asClass(Boostrap).singleton(),

  Sneaker: asClass(Sneaker).singleton(),
  Description: asClass(Description).singleton(),
  Brand: asClass(Brand).singleton(),
  Set: asClass(Set).singleton(),
  Image: asClass(Image).singleton(),
  Price: asClass(Price).singleton(),
  Extended: asClass(Extended).singleton(),
  Href: asClass(Href).singleton(),
  User: asClass(User).singleton(),

  sneakersRepository: asClass(SneakersRepository).singleton(),
  descriptionsRepository: asClass(DescriptionsRepository).singleton(),
  brandsRepository: asClass(BrandsRepository).singleton(),
  setsRepository: asClass(SetsRepository).singleton(),
  imagesRepository: asClass(ImagesRepository).singleton(),
  pricesRepository: asClass(PricesRepository).singleton(),
  extendedsRepository: asClass(ExtendedsRepository).singleton(),
  hrefsRepository: asClass(HrefsRepository).singleton(),
  usersRepository: asClass(UsersRepository).singleton(),

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

  Parser: asClass(Parser).singleton(),
  Search: asClass(Search).singleton(),
  Updater: asClass(Updater).singleton(),

  UserResourse: asClass(UserResourse).singleton(),
  BrandResource: asClass(BrandResource).singleton(),
  SetResource: asClass(SetResource).singleton(),
  SneakerResource: asClass(SneakerResource).singleton(),
  SneakerExtendedResource: asClass(SneakerExtendedResource).singleton(),

  config: asValue(config),
  sequelize: asClass(sequelize)
})

export default container
