const router = require('express').Router();
const { Order, Glasses, User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Glasses }, { model: User }],
    });
    res.json(orders);
  } catch (err) {
    next(err);
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
    updatedOrder.update(req.body);
    const updatedOrderWithInfo = await Order.findById(req.params.id, {
      include: [{ model: Glasses }, { model: User }],
    });
    res.json(updatedOrderWithInfo);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedOrder = await Order.findById(req.params.id);
    deletedOrder.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
