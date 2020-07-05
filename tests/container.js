import {createContainer, asValue, asClass, InjectionMode} from 'awilix'

import Server from '../src/pres/server'
import ManageDb from '../src/infra/database/index'
import Application from '../src/app/app'
import Parser from '../src/domain/services/parserService/Parser'
import Search from '../src/domain/services/searchService/Search'

import ClassLoader from '../utils/classLoader/index'
import StringTools from '../utils/stringTools/index'
import Requester from '../utils/requester/index'
import NameResolver from '../utils/nameResolver/index'

import Farfetch from '../src/domain/services/parserService/shops/Farfetch'
import Flightclub from '../src/domain/services/parserService/shops/Flightclub'
import Goat from '../src/domain/services/parserService/shops/Goat'
import Klekt from '../src/domain/services/parserService/shops/Klekt'
import Solestage from '../src/domain/services/parserService/shops/Solestage'
import Solesupremacy from '../src/domain/services/parserService/shops/Solesupremacy'
import Stadiumgoods from '../src/domain/services/parserService/shops/Stadiumgoods'
import Stockx from '../src/domain/services/parserService/shops/Stockx'
import UrbanNecessities from '../src/domain/services/parserService/shops/UrbanNecessities'

import SneakerDomain from '../src/domain/sneaker'
import DescriptionDomain from '../src/domain/description'
import BrandDomain from '../src/domain/brand'
import SetDomain from '../src/domain/set'
import ImageDomain from '../src/domain/image'
import ExtendedDomain from '../src/domain/extended'
import PriceDomain from '../src/domain/price'
import HrefDomain from '../src/domain/href'

import Boostrap from '../src/infra/database/sql/Boostrap'
import Sneaker from '../src/infra/database/sql/models/Sneaker'
import Description from '../src/infra/database/sql/models/Description'
import Brand from '../src/infra/database/sql/models/Brand'
import Set from '../src/infra/database/sql/models/Set'
import Image from '../src/infra/database/sql/models/Image'
import Price from '../src/infra/database/sql/models/Price'
import Extended from '../src/infra/database/sql/models/Extended'
import Href from '../src/infra/database/sql/models/Href'


import SneakersRepository from '../src/infra/database/sql/repositories/SneakersRepository'
import DescriptionsRepository from '../src/infra/database/sql/repositories/DescriptionsRepository'
import BrandsRepository from '../src/infra/database/sql/repositories/BrandsRepository'
import SetsRepository from '../src/infra/database/sql/repositories/SetsRepository'
import ImagesRepository from '../src/infra/database/sql/repositories/ImagesRepository'
import PricesRepository from '../src/infra/database/sql/repositories/PricesRepository'
import ExtendedsRepository from '../src/infra/database/sql/repositories/ExtendedsRepository'
import HrefsRepository from '../src/infra/database/sql/repositories/HrefsRepository'

import SneakersController from '../src/pres/http/controllers/SneakersController'

import SneakersRoutes from '../src/pres/http/routes/SneakersRoutes'
import Routes from '../src/pres/http/routes/index'
import config from '../config/keys'
import sequelize from '../config/sequelize'

import SneakerFactory from './factories/SneakerFactory'
import DescriptionFactory from './factories/DescriptionFactory'
import BrandFactory from './factories/BrandFactory'
import LineFactory from './factories/LineFactory'
import PriceFactory from './factories/PriceFactory'
import ExtendedFactory from './factories/ExtendedFactory'
import ImageFactory from './factories/ImageFactory'
import HrefFactory from './factories/HrefFactory'

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

  Boostrap: asClass(Boostrap).singleton(),

  SneakerDomain: asClass(SneakerDomain).singleton(),
  DescriptionDomain: asClass(DescriptionDomain).singleton(),
  BrandDomain: asClass(BrandDomain).singleton(),
  SetDomain: asClass(SetDomain).singleton(),
  ExtendedDomain: asClass(ExtendedDomain).singleton(),
  ImageDomain: asClass(ImageDomain).singleton(),
  PriceDomain: asClass(PriceDomain).singleton(),
  HrefDomain: asClass(HrefDomain).singleton(),

  Boostrap: asClass(Boostrap).singleton(),

  Sneaker: asClass(Sneaker).singleton(),
  Description: asClass(Description).singleton(),
  Brand: asClass(Brand).singleton(),
  Set: asClass(Set).singleton(),
  Image: asClass(Image).singleton(),
  Price: asClass(Price).singleton(),
  Extended: asClass(Extended).singleton(),
  Href: asClass(Href).singleton(),

  sneakersRepository: asClass(SneakersRepository).singleton(),
  descriptionsRepository: asClass(DescriptionsRepository).singleton(),
  brandsRepository: asClass(BrandsRepository).singleton(),
  setsRepository: asClass(SetsRepository).singleton(),
  imagesRepository: asClass(ImagesRepository).singleton(),
  pricesRepository: asClass(PricesRepository).singleton(),
  extendedsRepository: asClass(ExtendedsRepository).singleton(),
  hrefsRepository: asClass(HrefsRepository).singleton(),

  sneakersController: asClass(SneakersController).singleton(),

  sneakersRoutes: asClass(SneakersRoutes).singleton(),
  routes: asClass(Routes).singleton(),

  ClassLoader: asClass(ClassLoader).singleton(),
  StringTools: asClass(StringTools).singleton(),
  Requester: asClass(Requester).singleton(),
  NameResolver: asClass(NameResolver).singleton(),

  Parser: asClass(Parser).singleton(),
  Search: asClass(Search).singleton(),

  config: asValue(config),
  sequelize: asClass(sequelize),

  sneakerFactory: asClass(SneakerFactory).singleton(),
  descriptionFactory: asClass(DescriptionFactory).singleton(),
  brandFactory: asClass(BrandFactory).singleton(),
  lineFactory: asClass(LineFactory).singleton(),
  imageFactory: asClass(ImageFactory).singleton(),
  priceFactory: asClass(PriceFactory).singleton(),
  extendedFactory: asClass(ExtendedFactory).singleton(),
  hrefFactory: asClass(HrefFactory).singleton(),
})

export default container
