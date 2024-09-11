const { Router } = require('express');
const { getAllBooks, addBooks, deleteBook, updateBook, findBookById } = require('../controllers/bookcontroller');

const BookRouter = Router();
BookRouter.get('/:id',findBookById);
BookRouter.delete('/delete/:id',deleteBook);
BookRouter.get('/books',getAllBooks);
BookRouter.post('/addbooks',addBooks);
BookRouter.patch('/update/:id',updateBook);

module.exports = BookRouter;