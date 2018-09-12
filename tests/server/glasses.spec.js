const db = require('../../server/db/')
const {Glasses} = require('../../server/db/models/')
const Promise = require('bluebird');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

console.log("run");

describe("The Glasses model", () => {
   console.log('checking glasses model');
    before(() => {
        return db.sync({force: true});
    });

    let glasses;
    beforeEach(() => {
        glasses = Glasses.build({
            name: 'Red glasses',
            price: 20000,
            imageUrl: 'someUrl',
        })
    })

    describe("Attributes",  () =>{
       console.log('checking attribute')
       
        it("Includes name, price, and image url attributes", async ()=> {
            const savedGlasses = await glasses.save();
            expect(savedGlasses.name).to.equal("Red glasses");
            expect(savedGlasses.price).to.equal(20000);
            expect(savedGlasses.imageUrl).to.equal('someUrl');
        });

        it("Defaults available to true", () => {
            expect(glasses.available).to.equal(true);
        });
    })
});
