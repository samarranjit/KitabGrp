const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  review: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: [String], // Array of genres (e.g., ['Fiction', 'Mystery'])
    required: true,
  },
  coverImage: {
    type: String, // URL to the book's cover image stored in Cloudinary
    required: false,
  },
  publishedDate: {
    type: Date,
    required: false, // Optional
  },
  createdAt: {
    type: Date,
    // default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  reviewerName : {
    type: Object,
    required: true
  }
});

module.exports = {
    BookDetails : mongoose.model("book", bookSchema)
}