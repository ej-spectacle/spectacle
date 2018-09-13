const User = require('./user');
//const Item = require('./item')
const Glasses = require('./glasses');
const Order = require('./order');

//associations
//Item.belongsTo(Glasses)
//Item.belongsTo(User)
//Order.hasMany(Item)
//Item.belongsTo(Order)
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(Glasses);

module.exports = {
  User,
  Glasses,
  Order,
};
