const express = require('express');
const connectDB = require('./config/db');
const BookRouter = require('./routes/bookRoutes')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send({ message: "welcome to the book store.!" });
})
app.use('/books', BookRouter);

// Start the server
app.listen(8090, () => {
  console.log(`Server running on port 8090`);
  connectDB();
});
