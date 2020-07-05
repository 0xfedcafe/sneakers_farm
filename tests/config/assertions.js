export default {
  extended: {
    total: 1,
    results: [
      {
        sneaker_id: 'ER43TY',
        brands: [
          'YEEZY'
        ],
        sets: [
          '700'
        ],
        description:"some text",
        model: 'SALT',
        addition: 'KIDS',
        prices: [
          {
            size: 5,
            prices: [
              {price: 100, shop: 'Goat.com', href: 'http://ex.com'},
              {price: 100, shop: 'Goat.com', href: 'http://ex.com' },
              {price: 100, shop: 'Goat.com', href: 'http://ex.com' }
            ]
          }
        ],
        image: 'http://ex.com',
        view_count: 0,
      }
    ]
  },
  search: {
    total: 1,
    results: [
      {
        sneaker_id: 'ER43TY',
        brands: [
          'YEEZY'
        ],
        sets: [
          '700'
        ],
        model: 'SALT',
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
  sets:{
    total: 1,
    results:[
      {
        name: '700',
        set_id: 1,
        sneaker: {
          sneaker_id: 'ER43TY',
          brands: [
            'YEEZY'
          ],
          sets: [
            '700'
          ],
          model: 'SALT',
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
