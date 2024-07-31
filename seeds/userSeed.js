const { User } = require('../models');

const userData = [
    {username: 'user1', email: 'user1@example.com', password: 'password'},
    {username: 'user2', email: 'user2@example.com', password: 'password'},
    {username: 'user3', email: 'user3@example.com', password:  'password'},
    {username: 'user4', email: 'user4@example.com', password:  'password'},
    {username: 'user5', email: 'user5@example.com', password:  'password'},
    {username: 'user6', email: 'user6@example.com', password:  'password'},
    {username: 'user7', email: 'user7@example.com', password:  'password'},
    {username: 'user8', email: 'user8@example.com', password:  'password'},
    {username: 'user9', email: 'user9@example.com', password:  'password'},
    {username: 'user10', email: 'user10@example.com', password:  'password'},
    {username: 'user11', email: 'user11@example.com', password:  'password'},
    {username: 'user12', email: 'user12@example.com', password:  'password'},
    {username: 'user13', email: 'user13@example.com', password:  'password'},
    {username: 'user14', email: 'user14@example.com', password:  'password'},
    {username: 'user15', email: 'user15@example.com', password:  'password'},
]

const seedUser = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUser;