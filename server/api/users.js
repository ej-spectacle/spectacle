const router = require('express').Router();
const { User, Order, Glasses } = require('../db/models');
const Sequelize = require('sequelize');
module.exports = router;
const Op = Sequelize.Op;

router.get('/', async (req, res, next) => {
  if (req.user && req.user.dataValues.isAdmin) {
    try {
      const users = await User.findAll({
        exclude: 'password',
      });
      res.json(users);
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  } else {
    res.status(403).send('YOU SHALL NOT PASS');
  }
});

router.get('/:id', async (req, res, next) => {
  if (
    req.user &&
    (req.user.dataValues.id === Number(req.params.id) || req.user.dataValues.isAdmin)
  ) {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(403).send('Forbidden');
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
      order: [[{ model: Order }, 'purchaseDate', 'DESC']],
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
      for (let i = 0; i < user.orders.length; i++) {
        if (user.orders[i].refNumber !== seen) {
          //new ref number found
          orderRef = [];
          orderHist.push(orderRef);
          seen = user.orders[i].refNumber;
          orderRef.push(user.orders[i]);
        } else {
          orderRef.push(user.orders[i]);
        }
      }
      res.json(orderHist);
    }

router.get('/:id/cart', async (req, res, next) => {
  if (
    req.user &&
    (req.user.dataValues.id === Number(req.params.id) || req.user.dataValues.isAdmin)
  ) {
    try {
      const orders = await Order.findAll({
        where: {
          userId: req.params.id,
        },
        include: [{ model: Glasses }, { model: User }],
      });
      res.json(orders);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(403).send('Forbidden');
  }
});

router.put('/:id', async (req, res, next) => {
  if (
    req.user &&
    (req.user.dataValues.id === Number(req.params.id) || req.user.dataValues.isAdmin)
  ) {
    try {
      let user = await User.findById(req.params.id);
      user = await user.update(req.body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(403).send('Forbidden');
  }
});

router.delete('/:id', async (req, res, next) => {
  if (req.user && req.user.dataValues.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      await user.destroy();
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  } else {
    res.status(403).send('Forbidden');
  }
});
