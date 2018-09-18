'use strict';

const db = require('../server/db');
const { User, Glasses, Order } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'admin@email.com', password: '123', isAdmin: true }),
    User.create({ email: 'murphy@email.com', password: '123' }),
  ]);

  const glasses = await Promise.all([
    Glasses.create({ name: 'Black n White Cookies', price: 35000, imageUrl: '/glasses/blacknwhite.png' }),
    Glasses.create({ name: 'Sunshines in Blue', price: 95000, imageUrl: '/glasses/sunshine.png' }),
    Glasses.create({ name: 'Par Amour by L\'Aveugie', price: 25000, imageUrl: '/glasses/chic.png' }),
    Glasses.create({ name: 'Feathers All Around', price: 30000, imageUrl: '/glasses/feathers.png' }),
    Glasses.create({ name: 'I\'m Not Alone', price: 55000, imageUrl: '/glasses/gnome.png' }),
    Glasses.create({ name: 'Heroes Among Us', price: 30000, imageUrl: '/glasses/hero.png' }),
    Glasses.create({ name: 'You\'re Never Extra', price: 35000, imageUrl: '/glasses/may.png' }),
    Glasses.create({ name: 'Mirror for the King', price: 38000, imageUrl: '/glasses/mirrorframe.png' }),
    Glasses.create({ name: 'Sparkles at Night', price: 28000, imageUrl: '/glasses/sparkles.png' }),
    Glasses.create({ name: 'Helicopter Windshield', price: 85000, imageUrl: '/glasses/windshield.png' }),
    Glasses.create({ name: 'Zoom All The Way', price: 60000, imageUrl: '/glasses/zoom.png' }),
    Glasses.create({ name: 'Slice and Dice', price: 120000, imageUrl: '/glasses/scissors.png' }),
  ]);

  const orders = await Promise.all([
    Order.create({ userId: 1, glassId: 2, purchaseDate: '2018-08-09' }),
    Order.create({ userId: 1, glassId: 4, purchaseDate: '2018-08-09' }),
    Order.create({ userId: 2, glassId: 7, purchaseDate: '2018-08-09' }),
    Order.create({
      userId: 1,
      glassId: 5,
      price: 6000,
      purchaseDate: '2018-08-09',
      refNumber: 'asfiuhr98ehgri8adg',
    }),
    Order.create({
      userId: 1,
      glassId: 2,
      price: 4000,
      purchaseDate: '2018-08-09',
      refNumber: 'asfiuhr98ehgri8adg',
    }),
    Order.create({
      userId: 1,
      glassId: 3,
      price: 8000,
      purchaseDate: '2018-08-30',
      refNumber: 'sadlfhasdkjfhgri8adg',
    }),
  ]);

  console.log(`seeded ${users.length} users, ${glasses.length} glasses, ${orders.length} orders`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
