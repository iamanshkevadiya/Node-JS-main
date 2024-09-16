const { Router } = require('express');
const { getAllBooks, createBooks, deleteBook, updateBook, findBookById, BS } = require('../controllers/bookcontroller');

const BookRouter = Router();

BookRouter.get('/books', getAllBooks);
BookRouter.get('/books/book/:id', findBookById);
BookRouter.post('/addbooks', BS.single("img"), createBooks);
BookRouter.delete('/books/delete/:id', deleteBook);
BookRouter.patch('/books/update/:id', updateBook);

BookRouter.post("/upload", BS.single("img"), (req, res) => {
    console.log("req.file", req.file);

    res.send("file uploaded successfully")
})

module.exports = BookRouter;
