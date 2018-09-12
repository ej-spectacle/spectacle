const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
    date: {
        type: Sequelize.DATE
    }, //CG: Maybe remove this :O
    price: {
        type: Sequelize.INTEGER,
        defaultValue: null
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    } //CG: Consider making this field on order itself. 
});

module.exports = Item;