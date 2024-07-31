const Book = require('../models/Book');
const Goal = require('../models/Goal');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.render('books/index', { 
      title: 'Books', 
      books 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, pages, goalId } = req.body;
    const book = await Book.create({ title, author, pages, goalId }); 
        const goal = await Goal.findByPk(goalId);
    if (goal) {
      goal.booksRead += 1;
      await goal.save();
    }
    res.redirect('/books');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.pagesRead = req.body.pagesRead || book.pagesRead;
    await book.save();
    res.redirect('/books');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const goalId = book.goalId;
    await book.destroy();
        const goal = await Goal.findByPk(goalId);
    if (goal) {
      goal.booksRead -= 1;
      await goal.save();
    }
    res.redirect('/books');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

