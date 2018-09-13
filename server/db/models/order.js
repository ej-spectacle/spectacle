const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  purchaseDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
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
