const Books = require('../models/bookSchema');

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
const addBooks = async (req, res) => {
    let { title, author, category, publicationYear, price, quantity, description } = req.body;
    let data = {
        title,
        author,
        category,
        publicationYear,
        price,
        quantity,
        description,
    }
    const books = await Books.create(data);
    res.status(201).send(books);
};

// Update a book
const updateBook = async (req, res) => {
    let { id } = req.params;
    let books = await Books.findByIdAndUpdate(id, req.body);
    res.send(books);
}

module.exports = { getAllBooks, addBooks, deleteBook, updateBook, findBookById }