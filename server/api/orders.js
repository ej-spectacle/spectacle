const router = require('express').Router();
const { Order, Glasses } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Glasses }],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log('req body', req.body);
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedOrder = await Order.findById(req.params.id);
    updatedOrder.update(req.body);
    res.json(updatedOrder);
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
