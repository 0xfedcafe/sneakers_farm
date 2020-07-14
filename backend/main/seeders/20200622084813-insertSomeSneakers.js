'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('descriptions', [{
      content: 'some text',
    }],{})

    await queryInterface.bulkInsert('images', [{
      href: 'http://example.com',
    }],{})

    await queryInterface.bulkInsert('extendeds', [
      { view_count: 2},
      { view_count: 3},
      { view_count: 4},
      { view_count: 5},
      { view_count: 6},
    ],{})

    await queryInterface.bulkInsert('brands', [
      { name: 'YEEZY'},
      { name: 'ADIDAS'},
    ],{})

    let brands = await queryInterface.sequelize.query(
      `SELECT brand_id from brands;`
    );
    brands = brands[0]

    await queryInterface.bulkInsert('sets', [
      { name: '700',brand_id: brands[0].brand_id},
      { name: '300',brand_id: brands[0].brand_id},
      { name: 'V1',brand_id: brands[1].brand_id},
    ],{})

    let descriptions = await queryInterface.sequelize.query(
      `SELECT description_id from descriptions;`
    );
    descriptions = descriptions[0]

    let extendeds = await queryInterface.sequelize.query(
      `SELECT extended_id from extendeds;`
    );
    extendeds = extendeds[0]

    let images = await queryInterface.sequelize.query(
      `SELECT image_id from images;`
    );
    images = images[0]

    await queryInterface.bulkInsert('sneakers', [
      { model: 'SALT', extended_id: extendeds[0].extended_id, description_id: descriptions[0].description_id, image_id: images[0].image_id, sneaker_id: 'TY12RF'  },
      { model: 'MAGNET', extended_id: extendeds[0].extended_id, description_id: descriptions[0].description_id, image_id: images[0].image_id, sneaker_id: 'TY12RD' },
      { model: 'HOSPITAL BLUE', extended_id: extendeds[0].extended_id, description_id: descriptions[0].description_id, image_id: images[0].image_id, sneaker_id: 'TY12RL' },
      { model: 'RED', extended_id: extendeds[0].extended_id, description_id: descriptions[0].description_id, image_id: images[0].image_id, sneaker_id: 'TY12RW' },
      { model: 'CREAM', extended_id: extendeds[0].extended_id, description_id: descriptions[0].description_id, image_id: images[0].image_id, sneaker_id: 'TY12RQ' },
    ],{})

    let sneakers = await queryInterface.sequelize.query(
      `SELECT sneaker_id from sneakers;`
    );
    sneakers = sneakers[0]

    await queryInterface.bulkInsert('Sneaker_Brands', [
      {sneaker_id: sneakers[0].sneaker_id, brand_id: brands[0].brand_id},
      {sneaker_id: sneakers[0].sneaker_id, brand_id: brands[1].brand_id},
      {sneaker_id: sneakers[1].sneaker_id, brand_id: brands[0].brand_id},
      {sneaker_id: sneakers[2].sneaker_id, brand_id: brands[0].brand_id},
      {sneaker_id: sneakers[3].sneaker_id, brand_id: brands[1].brand_id},
      {sneaker_id: sneakers[4].sneaker_id, brand_id: brands[1].brand_id},
    ],{})

    await queryInterface.bulkInsert('Sneaker_Lines', [
      {sneaker_id: sneakers[0].sneaker_id, set_id: 0},
      {sneaker_id: sneakers[0].sneaker_id, set_id: 2},
      {sneaker_id: sneakers[1].sneaker_id, set_id: 0},
      {sneaker_id: sneakers[2].sneaker_id, set_id: 1},
      {sneaker_id: sneakers[3].sneaker_id, set_id: 1},
      {sneaker_id: sneakers[4].sneaker_id, set_id: 2},
    ],{})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
