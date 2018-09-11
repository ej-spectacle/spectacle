const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
    date: {
        type: Sequelize.DATE
    },
    price: {
        type: Sequelize.INTEGER,
        defaultValue: null
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Item;