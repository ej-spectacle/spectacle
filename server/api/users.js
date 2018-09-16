const router = require('express').Router();
const { User, Order, Glasses } = require('../db/models');
const Sequelize = require('sequelize');
module.exports = router;
const Op = Sequelize.Op;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      exclude: password,
    });
    res.json(users);
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/completed-orders', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, {
      include: {
        model: Order,
        include: {
          model: Glasses,
        },
        where: { refNumber: { [Op.ne]: null } }, 
      }, 
      order: [[{model: Order}, 'purchaseDate', 'DESC']],
    });
    if (!user) {
      //could change to a 404 error
      res.json([]);
    } else {
      //res.json(user.orders);
      //return;
      let seen = '';
      let orderHist = [];
      let orderRef = [];
      for(let i = 0; i < user.orders.length; i++){
        if (user.orders[i].refNumber !== seen){
          //new ref number found
          orderRef = [];
          orderHist.push(orderRef);
          seen = user.orders[i].refNumber;
          orderRef.push(user.orders[i]);
        } else {
          orderRef.push(user.orders[i]);
        }
      }
      res.json(orderHist)
    }

  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    user = await user.update(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    await user.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
