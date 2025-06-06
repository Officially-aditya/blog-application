const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    excerpt: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', blogSchema);
