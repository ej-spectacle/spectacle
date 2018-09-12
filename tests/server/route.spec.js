const db = require('../../server/db/')
const { Glasses } = require('../../server/db/models/')
const chai = require('chai')
const expect = chai.expect
const axios = require('axios')
const app = require('../../server/index')
const agent = require('supertest')(app)

describe('API Routes', () => {
  before(() => {
    return db.sync({ force: true })
  })
  it('Responds with an empty array', async () => {
    let res = await agent.get('/api/glasses')
    expect(res.body.length).to.equal(0)
  })
  it('/glasses route', async () => {
    const glasses = await Glasses.create({
      name: 'Red glasses',
      price: 20000,
      imageUrl: 'someUrl',
    })

    let res = await agent.get('/api/glasses')
    expect(res.body[0].name).to.equal('Red glasses')
    expect(res.body[0].price).to.equal(20000)
    expect(res.body[0].imageUrl).to.equal('someUrl')
  })
})
