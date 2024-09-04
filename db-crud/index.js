const express = require('express');
const User = require('./useschema');
const dbconnect = require('./db');

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('Welcome to the API');
})

app.get('/user', async (req, res) => {
    let data = await User.find();
    res.send(data);
});

app.post('/add', async (req, res) => {
    let data = await User.create(req.body);
    res.send(data);
});

app.delete("/:id", async (req, res) => {
    let { id } = req.params;
    let data = await User.findByIdAndDelete(id);
    res.send(data);
});

app.patch("/:id", async (req, res) => {
    let { id } = req.params
    let data = await User.findByIdAndUpdate(id, req.body);
    res.send(data);
});


app.listen(8090 , () => {
    console.log('Server is running on port 8090');
    dbconnect();
});