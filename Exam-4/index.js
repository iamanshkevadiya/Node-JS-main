const express = require('express');
const app = express();

app.use(express.json());

const items = [];

app.get('/', (req, res) => {
    res.send(items);
});

// POST method to add a new item
app.post('/items', (req, res) => {
    const { title, price, category } = req.body;
    const newItem = { title, price, category };
    items.push(newItem);
    res.send(newItem);
});

// PATCH method to update an item by ID
app.patch('/items/:id', (req, res) => {
    const { id } = req.params;
    const { title, price, category } = req.body;
    if (items[id]) {
        if (title) items[id].title = title;
        if (price) items[id].price = price;
        if (category) items[id].category = category;
        res.send(items[id]);
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});

// DELETE method to remove an item by ID
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    if (items[id]) {
        const deletedItem = items.splice(id, 1);
        res.send(deletedItem);
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});

app.listen(8090, () => {
    console.log('Server running on http://localhost:8090');
});
