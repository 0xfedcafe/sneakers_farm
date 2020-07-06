module.exports = {
  server:{
    port: process.env.PORT,
  },
  sql:{
    user: "root",
    password: "Igor04rik",
    database: "root",
    host: "root.ctim5d9dbii9.us-east-2.rds.amazonaws.com",
  },
  logUrl: 'https://sneakers-farm-bot.herokuapp.com',
  cookieKey: 'testkey',
  EurToUsd: 1.12,
  proxy: 'https://app.zenscrape.com/api/v1/get?apikey=2ee13050-298b-11ea-a2c0-f57b0d6fdc24&url=',
  timeout: 20000,
  brands:[
    'ADIDAS',
    'YEEZY'
  ],
  lines:[
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
