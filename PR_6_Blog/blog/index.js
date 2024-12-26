const express = require('express');
const userRouter = require('./router/user.router');
const { db } = require('./models/blog.model');
const path = require('path');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/user', userRouter);
const PORT = 8090;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    db();
})