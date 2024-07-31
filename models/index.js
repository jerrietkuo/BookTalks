const User = require('./User');
const Bookshelf = require('./Bookshelf');
const Book = require('./Book');
const Conversations = require('./conversations');
const Chat = require('./chat');

Bookshelf.hasMany(Book, {
  foreignKey: 'Bookshelf_id',
});

Book.belongsTo(Bookshelf, {
  foreignKey: 'Bookshelf_id',
});

Conversations.hasMany(Chat);
Chat.belongsTo(Conversations);

User.hasMany(Conversations, {foreignKey: '1stUserId'});
Conversations.belongsTo(User);

User.hasMany(Chat);
Chat.belongsTo(User);

module.exports = { User, Bookshelf, Book, Conversations, Chat };
