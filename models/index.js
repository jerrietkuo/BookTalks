const User = require('./User');
const Bookshelf = require('./Bookshelf');
const Book = require('./Book');

Bookshelf.hasMany(Book, {
  foreignKey: 'Bookshelf_id',
});

Book.belongsTo(Bookshelf, {
  foreignKey: 'Bookshelf_id',
});

module.exports = { User, Bookshelf, Book };
