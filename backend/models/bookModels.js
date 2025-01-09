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
  rating: {
    type: Number,
    required: true
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
  reviwerId : {
    type: String,
    required: true
  },
  likeCount:{
    type : [String],
    required: false
  }
});

module.exports = {
    BookDetails : mongoose.model("book", bookSchema)
}