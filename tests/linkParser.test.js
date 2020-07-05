require('mysql2/node_modules/iconv-lite').encodingExists('foo');

import config from './config/shopConfig'
import awilix from '../src/container'


const container = awilix.cradle
const Boostrap = container.Boostrap
Boostrap.assosiate()
Boostrap.loadClasses()

test('Link from UrbanNecessities is parsed',async ()=>{
  const link = await container.Parser.resolveLink('UrbanNecessities.com', 'EE7287')
  expect(link.href.length).toBeGreaterThan(config.UrbanNecessities.baseLink.length)
})

test('Link from Stockx is parsed',async ()=>{
  const link = await container.Parser.resolveLink('Stockx.com', 'EE7287')
  expect(link.href.length).toBeGreaterThan(config.Stockx.baseLink.length)
})

test('Link from Stadiumgoods is parsed',async ()=>{
  const link = await container.Parser.resolveLink('Stadiumgoods.com', 'EE7287')
  expect(link.href.length).toBeGreaterThan(config.Stadiumgoods.baseLink.length)
})

test('Link from Solesupremacy is parsed',async ()=>{
  const link = await container.Parser.resolveLink('Solesupremacy.com', 'EE7287')
  expect(link.href.length).toBeGreaterThan(config.Solesupremacy.baseLink.length)
})

test('Link from Solestage is parsed',async ()=>{
  const link = await container.Parser.resolveLink('Solestage.com', 'EE7287')
  expect(link.href.length).toBeGreaterThan(config.Solestage.baseLink.length)
})

test('Link from Klekt is parsed',async ()=>{
  const link = await container.Parser.resolveLink('Klekt.com', 'EE7287')
  expect(link.href.length).toBeGreaterThan(config.Klekt.baseLink.length)
})

test('Link from Goat is parsed',async ()=>{
  const link = await container.Parser.resolveLink('Goat.com', 'EE7287')
  expect(link.href.length).toBeGreaterThan(config.Goat.baseLink.length)
})

test('Link from Flightclub is parsed',async ()=>{
  const link = await container.Parser.resolveLink('Flightclub.com', 'EE7287')
  expect(link.href.length).toBeGreaterThan(config.Flightclub.baseLink.length)
})
