const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      exclude: password,
    })
    res.json(users)
  } catch (err) {
    res.sendStatus(404)
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/orders', async (req, res, next) => {
  try {
<<<<<<< HEAD
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      isAdmin: false,
=======
    const user = await User.findById(req.params.id, {
      include: ({ model: Order })
>>>>>>> master
    })
    res.json(user.orders)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    user = await user.update(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    await user.destroy()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
