module.exports = {
  server:{
    port: 8000,
  },
  sql:{
    user: "root_user",
    password: "root_password",
    database: "root_database",
    host: "db",
    port: 3306
  },
  logUrl: 'http://bot:8000',
  cookieKey: 'testkey',
  EurToUsd: 1.12,
  proxy: 'https://app.zenscrape.com/api/v1/get?apikey=2ee13050-298b-11ea-a2c0-f57b0d6fdc24&url=',
  timeout: 20000,
  parse_delay: 1000 * 60 * 15,
  brands:[
    'ADIDAS',
    'YEEZY'
  ],
  models:[
    '700',
    '500',
    '350',
    'V1',
    'V2'
  ],
  additions:[
    'REFLECTIVE',
    'KIDS',
    'INFANT'
  ],
  trash:[
    'BOOST'
  ],
  shops:[
    "Stockx.com","Goat.com","Flightclub.com","Solesupremacy.com","Stadiumgoods.com","Solestage.com","UrbanNecessities.com","Klekt.com"
  ]
}
