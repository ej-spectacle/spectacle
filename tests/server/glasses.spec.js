const db = require('../../server/db/');
const { Glasses } = require('../../server/db/models/');
const chai = require('chai');
const expect = chai.expect;

describe('The Glasses model', () => {
  before(() => {
    return db.sync({ force: true });
  });

  let glasses;
  beforeEach(() => {
    glasses = Glasses.build({
      name: 'Red glasses',
      price: 20000,
      imageUrl: 'someUrl',
    });
  });

  describe('Attributes', () => {
    it('Includes name, price, and image url attributes', async () => {
      const savedGlasses = await glasses.save();
      expect(savedGlasses.name).to.equal('Red glasses');
      expect(savedGlasses.price).to.equal(20000);
      expect(savedGlasses.imageUrl).to.equal('someUrl');
    });

    it('Defaults available to true', () => {
      expect(glasses.available).to.equal(true);
    });
  });
});
