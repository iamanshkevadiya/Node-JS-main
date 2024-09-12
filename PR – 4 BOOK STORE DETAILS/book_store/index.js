const express = require('express');
const connectDB = require('./config/db');
const BookRouter = require('./routes/bookRoutes');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: "welcome to the book store.!" });
})

// image
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/', BookRouter);

// Start the server
app.listen(8090, () => {
  console.log(`Server running on port 8090`);
  connectDB();
});
