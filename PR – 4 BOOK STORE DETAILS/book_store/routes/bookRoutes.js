const { Router } = require('express');
const { getAllBooks, createBooks, deleteBook, updateBook, findBookById, upload } = require('../controllers/bookcontroller');

const BookRouter = Router();

BookRouter.get('/:id', findBookById);
BookRouter.delete('/delete/:id', deleteBook);
BookRouter.get('/books', getAllBooks);
BookRouter.post('/addbooks', upload.single("img"), createBooks);
BookRouter.patch('/update/:id', updateBook);

BookRouter.post("/upload", upload.single("img"), (req, res) => {
    console.log("req.file", req.file);

    res.send("file uploaded successfully")
})

module.exports = BookRouter;
