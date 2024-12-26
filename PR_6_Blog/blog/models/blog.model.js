const mongoose = require('mongoose');

const blogShcema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    author: String,
    category: String,
    likedBy: [{ username: String }],
    comments: [
        {
            text: String,
            username: String,
            date: { type: Date, default: Date.now },
        },
    ],
});

const Blog = mongoose.model("Blog", blogShcema);

module.exports = Blog;