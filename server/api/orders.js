const router = require('express').Router();
const { Order, Glasses, User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  if (req.user && req.user.dataValues.isAdmin) {
    try {
      const orders = await Order.findAll({
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
    const newOrder = await Order.create(req.body);
    const newOrderWithInfo = await Order.findById(newOrder.id, {
      include: [{ model: Glasses }, { model: User }],
    });
    res.status(201).json(newOrderWithInfo);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedOrder = await Order.findById(req.params.id);
    await updatedOrder.update(req.body);
    const updatedOrderWithInfo = await Order.findById(req.params.id, {
      include: [{ model: Glasses }, { model: User }],
    });
    res.json(updatedOrderWithInfo);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  if (req.user) {
    try {
      const deletedOrder = await Order.findById(req.params.id);
      if (req.user.dataValues.id === deletedOrder.userId || req.user.dataValues.isAdmin) {
        deletedOrder.destroy();
        res.sendStatus(204);
      } else {
        res.status(403).send('Forbidden');
      }
    } catch (err) {
      next(err);
    }
  } else {
    res.status(403).send('Forbidden');
  }
});
