const router = require('express').Router();
const { User, Order, Glasses } = require('../db/models');
module.exports = router;

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
