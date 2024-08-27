const express = require('express');
const app = express();
const port = 8090;

app.use(express.json()); // Middleware to parse JSON bodies

// Initial Todos Array
let initialTodo = [
    { title: "HTML", isCompleted: true, id: 1 },
    { title: "JavaScript", isCompleted: false, id: 2 },
    { title: "React", isCompleted: false, id: 3 }
];

// Welcome Route
app.get('/', (req, res) => {
    res.send('Welcome to the Todo API');
});

// Get All Todos
app.get('/todos', (req, res) => {
    res.json(initialTodo);
});

// Add a New Todo
app.post('/addtodo', (req, res) => {
    const { title, isCompleted } = req.body;

    if (typeof title === 'string' && typeof isCompleted === 'boolean') {
        const newTodo = {
            title,
            isCompleted,
            id: initialTodo.length ? initialTodo[initialTodo.length - 1].id + 1 : 1,
        };
        initialTodo.push(newTodo);
        res.status(201).json(newTodo);
    } else {
        res.status(400).json({ error: "Invalid data format" });
    }
});

// Update a Todo by ID
app.patch('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, isCompleted } = req.body;

    const todo = initialTodo.find(todo => todo.id === id);
    if (todo) {
        if (title !== undefined) todo.title = title;
        if (isCompleted !== undefined) todo.isCompleted = isCompleted;
        res.json(todo);
    } else {
        res.status(404).json({ error: "Todo not found" });
    }
});

// Delete a Todo by ID
app.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = initialTodo.findIndex(todo => todo.id === id);

    if (index !== -1) {
        let deletedTodo = initialTodo.splice(index, 1)[0];
        res.json({ deletedTodo, todos: initialTodo });
    } else {
        res.status(404).json({ error: "Todo not found" });
    }
});

// Get a Single Todo by ID
app.get('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = initialTodo.find(todo => todo.id === id);

    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: "Todo not found" });
    }
});

// Filter Todos by Status
app.get('/findbystatus', (req, res) => {
    const { isCompleted } = req.query;

    if (isCompleted === 'true' || isCompleted === 'false') {
        const filteredTodos = initialTodo.filter(todo => todo.isCompleted.toString() === isCompleted);
        res.json(filteredTodos);
    } else {
        res.status(400).json({ error: "Invalid query parameter" });
    }
});

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
