const { Author, Book } = require('../models');

// GET /api/authors
exports.getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.findAll({ include: [{ model: Book, as: 'books' }] });
    res.json(authors);
  } catch (err) { next(err); }
};

// GET /api/authors/:id
exports.getAuthorById = async (req, res, next) => {
  try {
    const author = await Author.findByPk(req.params.id, { include: [{ model: Book, as: 'books' }] });
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (err) { next(err); }
};

// POST /api/authors
exports.createAuthor = async (req, res, next) => {
  try {
    const { name, bio, nationality } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const author = await Author.create({ name, bio, nationality });
    res.status(201).json(author);
  } catch (err) { next(err); }
};

// PUT /api/authors/:id
exports.updateAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    const { name, bio, nationality } = req.body;
    await author.update({ name, bio, nationality });
    res.json(author);
  } catch (err) { next(err); }
};

// DELETE /api/authors/:id
exports.deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    await author.destroy();
    res.json({ message: 'Author deleted successfully' });
  } catch (err) { next(err); }
};
