# Sneakers Farm

This is a REST api for sneakers.farm service.

## Extended version

I decide to improve basic api for a bit and added some featured, which you can find on `extended` branch.

# Installation

## Run the app

    npm start

## Run tests

    npm test

# Usage

## Get brands

#### Request

    GET http://example/sneakers/brands

#### Response

    Status: 200 OK
    {
      total: count,
      results: [
        {name: name1, brand_id: brand_id1},
        {name: name2, brand_id: brand_id2},
        ...
      ]
    }


## Get sets

#### Request

    GET http://example/sneakers/sets/{brand_id}

#### Response

    Status: 200 OK
    {
      total: count,
      results: [
        {
          name: name1,
          set_id: set_id1,
          sneaker: {
            id: sneaker_id,
            model: sneaker_model,
            addition: sneaker_addition (like 'NON-REFLECTIVE KIDS'),
            image: "https://example.com",
            brands: [
                brand_1,
                brand_2,
                ...
            ],
            sets: [
              set_1,
              set_2,
              ...
            ],
            min: {
              price: price1,
              shop: shop1
            }
          }
        },
        ...
      ]
    }

## Get sneaker

#### Request

    GET http://example/sneakers/{sneaker_id}

#### Response

    Status: 200 OK
    {
      total: count,
      results: [
        {
          id: sneaker_id,
          model: sneaker_model,
          addition: sneaker_addition (like 'NON-REFLECTIVE KIDS'),
          image: "https://example.com",
          description: "undefined",
          brands: [
              brand_1,
              brand_2,
              ...
          ],
          sets: [
            set_1,
            set_2,
            ...
          ],
          prices: [
            {size: size1, prices:[{ shop: shop1, price: price1, href: href1 }]},
            {size: size2, prices:[{ shop: shop1, price: price2, href: href1 }]},
            ...
          ]
        }
      ]
    }

## Search sneakers

#### Request

    GET http://example/sneakers/search

##### Options  
- brand_id  
- set_id
- query

#### Response

    Status: 200 OK
    {
      total: count,
      results: [
        {
          id: sneaker_id,
          model: sneaker_model,
          addition: sneaker_addition (like 'NON-REFLECTIVE KIDS'),
          image: "https://example.com",
          brands: [
              brand_1,
              brand_2,
              ...
          ],
          sets: [
            set_1,
            set_2,
            ...
          ],
          min: {
            price: price1,
            shop: shop1
          }
        },
        ...
      ]
    }


# Registration

## Sign Up

#### Request

    POST http://example/auth/sign_up

    {
      name: user_name,
      email: user_email,
      password: user_password

    }

#### Response

    Status: 201 Created
    {
      user: {
        name: user_name,
        email: user_email
      }
    }

## Sign In

#### Request

    POST http://example/auth/sign_in

    {
      email: user_email,
      password: user_password

    }

#### Response

    Status: 201 Created
    {
      message: 'logged in'
    }

## Log Out

#### Request

    GET http://example/auth/log_out

#### Response

    Status: 200 OK
    {
      message: 'logged out'
    }

## Get user

#### Request

    GET http://example/auth/user

#### Response

    Status: 200 OK
    {
      user: {
        name: user_name,
        email: user_email
      }
    }

    ## Get user

#### Request

    GET http://example/images/{ShopName.com}

#### Response

    image.svg
