const sequelize = require('../config/connection');
const seedBookshelf = require('./bookshelfData');
const seedBooks = require('./bookData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBookshelf();

  await seedBooks();

  process.exit(0);
};

seedAll();
