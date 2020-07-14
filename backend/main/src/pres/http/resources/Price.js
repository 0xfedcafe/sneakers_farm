
class Price{
  toJson(price){
    console.log(price);
    return {
      price: price.price,
      size: price.size,
      href: price.href,
      shop: price.shop,
      shoeCondition: price.shoeCondition,
      boxCondition: price.boxCondition
    }
  }
}

module.exports = Price
