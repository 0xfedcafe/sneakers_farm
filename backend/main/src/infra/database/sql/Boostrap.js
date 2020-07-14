
class Boostrap{
  constructor({ Sneaker, Description, Brand, Model, Price, Image, Extended, Href, User, Shelf, ClassLoader, SneakerDomain, DescriptionDomain,
    BrandDomain, ModelDomain, ImageDomain, ExtendedDomain, PriceDomain, HrefDomain, UserDomain, ShelfDomain }){
    this.Sneaker = Sneaker
    this.Description = Description
    this.Brand = Brand
    this.Model = Model
    this.Price = Price
    this.Image = Image
    this.Extended = Extended
    this.Href = Href
    this.User = User
    this.Shelf = Shelf

    this.ClassLoader = ClassLoader
    this.SneakerDomain = SneakerDomain
    this.DescriptionDomain = DescriptionDomain
    this.BrandDomain = BrandDomain
    this.ModelDomain = ModelDomain
    this.ImageDomain = ImageDomain
    this.ExtendedDomain = ExtendedDomain
    this.PriceDomain = PriceDomain
    this.HrefDomain = HrefDomain
    this.UserDomain = UserDomain
    this.ShelfDomain = ShelfDomain
  }

  assosiate(){
    this.Sneaker.belongsTo(this.Description,{ as: 'description', foreignKey: 'description_id' ,target:'description_id'})
    this.Sneaker.belongsTo(this.Extended,{ as: 'extended', foreignKey: 'extended_id' ,target:'extended_id'})
    this.Sneaker.belongsTo(this.Image,{ as: 'image', foreignKey: 'image_id' ,target:'image_id'})
    this.Sneaker.belongsTo(this.Model,{ as: 'model', foreignKey: 'model_id' ,target:'model_id'})
    this.Sneaker.hasMany(this.Price,{ as: 'prices', foreignKey: 'sneaker_id'})
    this.Sneaker.hasMany(this.Href,{ as: 'hrefs', foreignKey: 'sneaker_id'})

    this.Description.hasMany(this.Sneaker,{ as: 'sneakers', foreignKey: 'description_id' })
    this.Model.hasMany(this.Sneaker,{ as: 'sneakers', foreignKey: 'model_id' })
    this.Image.hasOne(this.Sneaker,{ as: 'sneaker', foreignKey: 'image_id' })
    this.Extended.hasOne(this.Sneaker,{ as: 'sneaker', foreignKey: 'extended_id' })
    this.Price.belongsTo(this.Sneaker,{ as: 'sneaker', foreignKey: 'sneaker_id', target: 'sneaker_id'})
    this.Href.belongsTo(this.Sneaker,{ as: 'sneaker', foreignKey: 'sneaker_id', target: 'sneaker_id'})

    this.Sneaker.belongsToMany(this.Brand, { through: 'Sneaker_Brands', foreignKey: 'sneaker_id', target: 'sneaker_id'});
    this.Brand.belongsToMany(this.Sneaker, { through: 'Sneaker_Brands', foreignKey: 'brand_id', target: 'brand_id'});

    this.Brand.belongsToMany(this.Model, { through: 'Brand_Models', foreignKey: 'brand_id', target: 'brand_id'});
    this.Model.belongsToMany(this.Brand, { through: 'Brand_Models', foreignKey: 'model_id', target: 'model_id'});

    this.Sneaker.belongsToMany(this.Shelf, { through: 'Shelf_Sneakers', foreignKey: 'sneaker_id', target: 'sneaker_id'});
    this.Shelf.belongsToMany(this.Sneaker, { through: 'Shelf_Sneakers', foreignKey: 'shelf_id', target: 'shelf_id'});
  }

  loadClasses(){
    this.ClassLoader.load(this.Sneaker,this.SneakerDomain)
    this.ClassLoader.load(this.Description,this.DescriptionDomain)
    this.ClassLoader.load(this.Brand,this.BrandDomain)
    this.ClassLoader.load(this.Model,this.ModelDomain)
    this.ClassLoader.load(this.Image,this.ImageDomain)
    this.ClassLoader.load(this.Sneaker,this.ExtendedDomain)
    this.ClassLoader.load(this.Price,this.PriceDomain)
    this.ClassLoader.load(this.Href,this.HrefDomain)
    this.ClassLoader.load(this.User,this.UserDomain)
    this.ClassLoader.load(this.Shelf,this.ShelfDomain)
  }
}

module.exports = Boostrap
