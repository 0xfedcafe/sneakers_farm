

class ManageDB{
  constructor({config, Boostrap}){
    this.config = config
    this.Boostrap = Boostrap
  }

  connect(){
    this.Boostrap.assosiate()
    this.Boostrap.loadClasses()
  }
}

module.exports = ManageDB
