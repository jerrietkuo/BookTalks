const { Op } = require('sequelize');
const Book = require('../models/Book');
const Search = require('../models/search');

const searchBooks = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    // Search for books
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { author: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    // Save search query and result
    await Search.create({
      query,
      result: books,
    });

    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  searchBooks,
};