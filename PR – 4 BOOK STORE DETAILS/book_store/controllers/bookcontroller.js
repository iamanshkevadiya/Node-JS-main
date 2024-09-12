const Books = require('../models/bookSchema');
const multer = require('multer');

// Get book by ID
const findBookById = async (req, res) => {
    let { id } = req.params;
    const books = await Books.findById(id);
    res.status(201).send(books);
};

// delete a book
const deleteBook = async (req, res) => {
    let { id } = req.params;
    let books = await Books.findByIdAndDelete(id);
    res.send(books);
};

// Get all Books
const getAllBooks = async (req, res) => {
    const books = await Books.find();
    res.status(200).send(books);
};

// Creat a new Book
const createBooks = async (req, res) => {
    console.log("req.body:", req.body);
    console.log("req.files:", req.file);

    let { title, author, category, publicationYear, price, quantity, description } = req.body;
    let imageUrl;
    if (req.file) {
        imageUrl = req.file.path;
    }
    let newbook = {
        title,
        author,
        category,
        publicationYear,
        price,
        quantity,
        description,
        imageUrl,
    }
    const books = await Books.create(newbook);
    res.status(201).send(books);
};

// Update a book
const updateBook = async (req, res) => {
    let { id } = req.params;
    let books = await Books.findByIdAndUpdate(id, req.body);
    res.send(books);
}

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({
    storage: storage,
});

module.exports = { getAllBooks, createBooks, deleteBook, updateBook, findBookById, upload }
