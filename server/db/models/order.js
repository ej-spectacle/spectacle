const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  price: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
  refNumber: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
});

module.exports = Order;
