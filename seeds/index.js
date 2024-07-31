const sequelize = require('../config/connection');
const seedBookshelf = require('./bookshelfData');
const seedBooks = require('./bookData');
const seedUser= require('./userSeed');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBookshelf();

  await seedBooks();

  await seedUser();

  process.exit(0);
};

seedAll();
