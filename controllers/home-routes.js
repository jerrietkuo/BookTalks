const router = require('express').Router();
const { bookshelf, book } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all bookshelves for homepage
router.get('/', async (req, res) => {
  try {
    const dbBookshelfData = await bookshelf.findAll({
      include: [
        {
          model: book,
          attributes: ['filename', 'description'],
        },
      ],
    });

    const bookshelves = dbBookshelfData.map((bookshelf) =>
      bookshelf.get({ plain: true })
    );

    res.render('homepage', {
      bookshelves,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one bookshelf
// Use the custom middleware before allowing the user to access the bookshelf
router.get('/bookshelf/:id', withAuth, async (req, res) => {
  try {
    const dbBookshelfData = await bookshelf.findByPk(req.params.id, {
      include: [
        {
          model: book,
          attributes: [
            'id',
            'title',
            'author',
            'filename',
            'description',
          ],
        },
      ],
    });
    
    const bookshelf = dbBookshelfData.get({ plain: true });
    res.render('bookshelf', { bookshelf, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one book
// Use the custom middleware before allowing the user to access the book
router.get('/book/:id', withAuth, async (req, res) => {
  try {
    const dbBookData = await book.findByPk(req.params.id);
    
    const book = dbBookData.get({ plain: true });

    res.render('book', { book, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
