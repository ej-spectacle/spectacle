const router = require('express').Router()
const {Glasses} = require('../db/models')
module.exports = router

//GET api/glasses
router.get('/', async (req, res, next) => {
  try {
    const allGlasses = await Glasses.findAll()
    res.send(allGlasses)
  } catch (err) {
    next(err)
  }
})

//GET api/glasses/:id
router.get('/:id', async (req, res, next) => {
  const glassesId = req.params.id
  try {
    const glasses = await Glasses.findById(glassesId)
    if (glasses) res.send(glasses)
  } catch (err) {
    next(err)
  }
})

//POST api/glasses ---> ADMIN only
router.post('/', async (req, res, next) => {
  try {
    const createdGlasses = await Glasses.create(req.body)

    if (createdGlasses) res.send(createdGlasses)
  } catch (err) {
    next(err)
  }
})

//PUT api/glasses/:id ---> ADMIN only
router.put('/:id', async (req, res, next) => {
  const glassesId = req.params.id
  try {
    const glasses = await Glasses.findById(glassesId)
    const updatedGlasses = await glasses.update(req.body)
    if (updatedGlasses) res.send(updatedGlasses)
  } catch (err) {
    next(err)
  }
})

//DELETE api/glasses/:id ---> ADMIN only
router.delete('/:id', async (req, res, next) => {
  const glassesId = req.params.id
  try {
    let deletedGlasses = await Glasses.destroy({
      id: glassesId
    })
    if (deletedGlasses) res.json(deletedGlasses)
  } catch (err) {
    next(err)
  }
})
