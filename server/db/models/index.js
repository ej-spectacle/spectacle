const User = require('./user')
const Item = require('./item')
const Glasses = require('./glasses')
const Order = require('./order')

//associations
Item.belongsTo(Glasses)
Item.belongsTo(User)
Order.hasMany(Item)
Item.belongsTo(Order)

module.exports = {
  User,
  Item,
  Glasses,
  Order,
}
