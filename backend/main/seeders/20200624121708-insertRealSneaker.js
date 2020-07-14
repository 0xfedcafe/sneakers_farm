'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('descriptions', [{
      content: 'some text for 500 v1 salt',
    }],{})

    await queryInterface.bulkInsert('images', [{
      href: "https://image.goat.com/crop/750/attachments/product_template_pictures/images/015/392/891/original/358539_00.png.png",
    }],{})

    await queryInterface.bulkInsert('extendeds', [
      { view_count: 2},
    ],{})

    await queryInterface.bulkInsert('brands', [
      { name: 'YEEZY'},
      { name: 'ADIDAS'},
    ],{})


    await queryInterface.bulkInsert('sets', [
      { name: '500'},
      { name: 'V1'},
    ],{})

    let brands = await queryInterface.sequelize.query(
      `SELECT brand_id from brands;`
    );
    brands = brands[0]

    let sets = await queryInterface.sequelize.query(
      `SELECT brand_id from sets;`
    );
    sets = sets[0]

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
      { model: 'SALT', extended_id: extendeds[0].extended_id, description_id: descriptions[0].description_id, image_id: images[0].image_id, sneaker_id: 'EE7287'  },
    ],{})

    let sneakers = await queryInterface.sequelize.query(
      `SELECT sneaker_id from sneakers;`
    );
    sneakers = sneakers[0]

    await queryInterface.bulkInsert('Sneaker_Brands', [
      {sneaker_id: sneakers[0].sneaker_id, brand_id: brands[0].brand_id},
      {sneaker_id: sneakers[0].sneaker_id, brand_id: brands[1].brand_id},
    ],{})

    await queryInterface.bulkInsert('Sneaker_Sets', [
      {sneaker_id: sneakers[0].sneaker_id, set_id: sets[0].set_id},
      {sneaker_id: sneakers[0].sneaker_id, set_id: sets[1].set_id},
    ],{})

    await queryInterface.bulkInsert('Brand_Sets', [
      {brand_id: brands[0].brand_id, set_id: sets[0].set_id},
      {brand_id: brands[0].brand_id, set_id: sets[1].set_id},
      {brand_id: brands[1].brand_id, set_id: sets[0].set_id},
      {brand_id: brands[1].brand_id, set_id: sets[1].set_id},
    ],{})


    await queryInterface.bulkInsert('hrefs', [
      {href: 'https://www.goat.com/sneakers/yeezy-500-salt-ee7287', shop: 'Goat.com', sneaker_id: sneakers[0].sneaker_id},
      {href: 'https://urbannecessities.com/products/yeezy-500-salt-ee7287', shop: 'UrbanNecessities.com', sneaker_id: sneakers[0].sneaker_id},
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
