const User = require('./user');
const Glasses = require('./glasses');
const Order = require('./order');

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(Glasses, { as: 'glasses' });

module.exports = {
  User,
  Glasses,
  Order,
};
