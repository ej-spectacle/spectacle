const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});
