module.exports = {
  extended: {
    hrefsCount: 3,
    needParsing: true,
    result:
      {
        sneaker_id: 'ER43TY',
        brands: 'YEEZY',
        model: '700',
        description:"some text",
        colorway: 'SALT',
        addition: 'KIDS',
        prices: [
          {
            size: 5,
            prices: [
              {price: 100, size: 5, shop: 'Goat.com', href: 'http://ex.com', shoeCondition: null, boxCondition: null},
              {price: 100, size: 5, shop: 'Goat.com', href: 'http://ex.com', shoeCondition: null, boxCondition: null},
              {price: 100, size: 5, shop: 'Goat.com', href: 'http://ex.com', shoeCondition: null, boxCondition: null}
            ]
          }
        ],
        image: 'http://ex.com',
        view_count: 0,
      }
  },
  search: {
    total: 1,
    results: [
      {
        sneaker_id: 'ER43TY',
        brands:'YEEZY',
        model: '700',
        colorway: 'SALT',
        addition: 'KIDS',
        image: 'http://ex.com',
      }
    ]
  },
  brands:{
    total: 1,
    results:[
      {name: 'YEEZY', brand_id: 1}
    ]
  },
  models:{
    total: 1,
    results:[
      {
        name: '700',
        model_id: 1,
        sneaker: {
          sneaker_id: 'ER43TY',
          brands: 'YEEZY',
          model: '700',
          colorway: 'SALT',
          addition: 'KIDS',
          image: 'http://ex.com',
        }
      }
    ]
  },
  log_out: { message: 'logged out'},
  sign_in: { message: 'logged in'},
  sign_up: {
    user: {
      name: 'user',
      email: 'ex@gmail.com'
    }
  },
  user: {
    name: 'user',
    email: 'ex@gmail.com',
    user_id: 1
  }
}
