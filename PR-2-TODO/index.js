const express = require('express');
const app = express();
const port = 8090;

app.use(express.json());

let initialTodo = [
  { title: 'HTML', isCompleted: true, id: 1 },
  { title: 'JavaScript', isCompleted: false, id: 2 },
  { title: 'React', isCompleted: false, id: 3 },
];

// Route to get a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the TODO API');
});

// Route to get all todos
app.get('/todos', (req, res) => {
  res.json(initialTodo);
});

// Route to add a new todo
app.post('/addtodo', (req, res) => {
  const { title, isCompleted } = req.body;
  if (!title || typeof isCompleted !== 'boolean') {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const newTodo = {
    title,
    isCompleted,
    id: initialTodo.length + 1,
  };
  initialTodo.push(newTodo);
  res.json(newTodo);
});

// Route to update a todo by id
app.patch('/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, isCompleted } = req.body;

  const todoIndex = initialTodo.findIndex(todo => todo.id == id);
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (title !== undefined) initialTodo[todoIndex].title = title;
  if (isCompleted !== undefined) initialTodo[todoIndex].isCompleted = isCompleted;

  res.json(initialTodo[todoIndex]);
});

// Route to delete a todo by id
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  const todoIndex = initialTodo.findIndex(todo => todo.id == id);
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const deletedTodo = initialTodo.splice(todoIndex, 1)[0];
  res.json({ deletedTodo, todos: initialTodo });
});

// Route to get a single todo by id
app.get('/todo/:id', (req, res) => {
  const { id } = req.params;

  const todo = initialTodo.find(todo => todo.id == id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.json(todo);
});

// Route to find todos by status
app.get('/findbystatus', (req, res) => {
  const { isCompleted } = req.query;

  if (isCompleted === undefined) {
    return res.status(400).json({ error: 'Query parameter isCompleted is required' });
  }

  const filteredTodos = initialTodo.filter(todo => todo.isCompleted == (isCompleted === 'true'));
  res.json(filteredTodos);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
