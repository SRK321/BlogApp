const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // This will reference the Category model
  }],

  scheduledTime: {
    type: Date,
    required: false,
  },

  image: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true, // Make sure each post has an author
},

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
