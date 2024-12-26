const mongoose = require('mongoose');

const DB = async () => {
    await mongoose.connect('mongodb://localhost:27017/blog');
    console.log('Connected to MongoDB');
}

module.exports = DB;