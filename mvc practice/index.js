const express = require('express');
const userRouter = require('./router/user.Router');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
})
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log('listening on port ', PORT);
    connectDB();

})