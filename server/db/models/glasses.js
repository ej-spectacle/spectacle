const Sequelize = require('sequelize')
const db = require('../db')


const Glasses = db.define('glasses', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '/glasses/default.png'
    },
    available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Glasses;
