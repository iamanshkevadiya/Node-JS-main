const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8020;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let items = [];

// Route to get a welcome message
app.get('/items', (req, res) => {
    res.json(items);
});

// POST method to add a new item
app.post('/items', (req, res) => {
    const { title, price, category } = req.body;

    if (!title || !price || !category) {
       return res.status(404).json({ message: 'All fields (title, price, category) are required.' });
    }

    const newItem = { id: items.length + 1, title, price, category };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PATCH method to update an item by ID
app.patch('/items/:id', (req, res) => {
    const { id } = req.params.id;
    const { title, price, category } = req.body;

    const item = items.find(item => item.id === id);
    if (!item) {
        return res.status(404).json({ message: 'Item not found.' });
    }
    if (title) item.title = title;
    if (price) item.price = price;
    if (category) item.category = category;
    res.json(item);
});


// DELETE method to remove an item by ID
app.delete('/items/:id', (req, res) => {
    const { id } = req.params.id;
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    items.splice(index, 1);
    res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});
