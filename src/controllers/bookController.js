const { Book, Author } = require('../models');

// GET /api/books
exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll({ include: [{ model: Author, as: 'author' }] });
    res.json(books);
  } catch (err) { next(err); }
};

// GET /api/books/:id
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id, { include: [{ model: Author, as: 'author' }] });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) { next(err); }
};

// POST /api/books
exports.createBook = async (req, res, next) => {
  try {
    const { title, genre, publishedYear, authorId } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });
    if (!authorId) return res.status(400).json({ error: 'authorId is required' });
    const author = await Author.findByPk(authorId);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    const book = await Book.create({ title, genre, publishedYear, authorId });
    res.status(201).json(book);
  } catch (err) { next(err); }
};

// PUT /api/books/:id
exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    const { title, genre, publishedYear, authorId } = req.body;
    if (authorId) {
      const author = await Author.findByPk(authorId);
      if (!author) return res.status(404).json({ error: 'Author not found' });
    }
    await book.update({ title, genre, publishedYear, authorId });
    res.json(book);
  } catch (err) { next(err); }
};

// DELETE /api/books/:id
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    await book.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (err) { next(err); }
};
