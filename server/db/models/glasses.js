const Sequelize = require('sequelize')
const db = require('../db')

const Glasses = db.define('glasses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    //CG: Maybe validate notEmpty for this string as well. 
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    //CG: Good job!!! But also maybe we want to  set a minimum here as a validator. 
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '/glasses/default.png',
  },
  available: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
})

module.exports = Glasses
