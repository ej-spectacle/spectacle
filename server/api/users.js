const router = require('express').Router();
const { User, Order, Glasses } = require('../db/models');
const Sequelize = require('sequelize');
module.exports = router;
const Op = Sequelize.Op;

router.get('/', async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
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
  if (req.user && (req.user.id === Number(req.params.id) || req.user.isAdmin)) {
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
  if (req.user && req.user.id === Number(req.params.id)) {
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
        //no orders found, send empty orders
        res.json([]);
      } else {
        //completed orders are all ordered by date
        //group all orders by ref #, every order with matching ref nums get pushed into their own sub array
        let seen = '';
        let orderHist = []; //array of all completed orders, grouped into purchase groups
        let orderRef = []; //sub-array representing purchase group. Contains all items grouped within the same purchase
        for (let i = 0; i < user.orders.length; i++) {
          if (user.orders[i].refNumber !== seen) {
            //new ref number seen, create subarray for all orders referenced by this ref #
            orderRef = [];
            //push single item into this order group
            orderHist.push(orderRef); //push sub array into main completed order array
            seen = user.orders[i].refNumber;
            orderRef.push(user.orders[i]);
          } else {
            //new order with existing ref number, push into sub array
            orderRef.push(user.orders[i]);
          }
        }
        //send array with sub-arrays
        res.json(orderHist);
      }
    } catch (err) {
      next(err);
    }
  } else {
    res.status(403).send('Forbidden');
  }
});

router.get('/:id/cart', async (req, res, next) => {
  if (req.user && req.user.id === Number(req.params.id)) {
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

router.post('/', async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: { email: req.body.email },
      defaults: { ...req.body, isAdmin: false },
    });
    res.json({ user, wasCreated });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  if (req.user && (req.user.id === Number(req.params.id) || req.user.isAdmin)) {
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
  if (req.user && req.user.isAdmin) {
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
