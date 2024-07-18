const { Bookshelf } = require('../models');

const Bookshelfdata = [
  {
    "Bookshelf_id": 1,
    "genre": "Fantasy"
  },
  {
    "Bookshelf_id": 2,
    "genre": "Adventure"
  },
  {
    "Bookshelf_id": 3,
    "genre": "Horror"
  },
  {
    "Bookshelf_id": 4,
    "genre": "Science Fiction"
  },
  {
    "Bookshelf_id": 5,
    "genre": "Romance"
  },
  {
    "Bookshelf_id": 6,
    "genre": "Thriller"
  },
  {
    "Bookshelf_id": 7,
    "genre": "Dystopian"
  },
  {
    "Bookshelf_id": 8,
    "genre": "Mystery"
  },
  {
    "Bookshelf_id": 9,
    "genre": "Historical Fiction"
  },
  {
    "Bookshelf_id": 10,
    "genre": "Biography"
  },
]

const seedBookshelf = () => Bookshelf.bulkCreate(Bookshelfdata);

module.exports = seedBookshelf;
