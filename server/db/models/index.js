const User = require('./user')
const Item = require('./item')
const Glasses = require('./glasses')
const Order = require('./order')

//associations
Item.belongsTo(Glasses);
Item.belongsTo(User);
Order.hasMany(Item);
Item.belongsTo(Order);

// CG: order.getGlasses();
//CG: VVVVVV
// Glasses.belongsToMany(Order, {through: Item})
// Order.belongsToMany(Glasses, {through: Item})
/*
  make an order for a cart status is incomplete/pending/cart...etc.
  Item.findAll({
    where: {
      userId: req.user.id
    }, 
    include: [{model: Product}]
  })

  Order.findOne({
    where: {
      userId: req.user.id,
      isCart: true
    }
  })

*/

module.exports = {
  User, Item, Glasses, Order
}
