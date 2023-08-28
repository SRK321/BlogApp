const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Post = require('../modules/Post');
const User = require('../modules/User');
const Category = require('../modules/Category') // Add the User module


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images"); // Set the destination folder where the image files will be saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Define the multer instance with the disk storage configuration
const upload = multer({ storage: storage });

// Create a new post with image upload
router.post('/posts', upload.single('image'), async (req, res) => {
  try {
    const { title, content, category, scheduledTime, username } = req.body;
    const imagePath = req.file ? req.file.filename : undefined; // Get the filename of the uploaded image

    // Convert category names to category IDs
    let categoryIds;
    if (Array.isArray(category)) {
      // If category is an array, convert all category names to category IDs
      categoryIds = await Promise.all(category.map(async (categoryName) => {
        let category = await Category.findOne({ name: categoryName });
        if (!category) {
          category = new Category({ name: categoryName });
          await category.save();
        }
        return category._id;
      }));
    } else {
      // If category is not an array, convert the single category name to a category ID
      let categoryObj = await Category.findOne({ name: category });
      if (!categoryObj) {
        categoryObj = new Category({ name: category });
        await categoryObj.save();
      }
      categoryIds = [categoryObj._id];
    }

    // Find the user by the provided username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPost = new Post({
      title,
      content,
      category: categoryIds,
      scheduledTime,
      image: imagePath,
      author: user._id, // Use the user's ObjectId as the author of the post
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})


// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username').populate('category', 'name');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single post by ID
// Get a single post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate({
        path: 'author',
        select: 'username', // Select only the 'username' field of the author
      })
      .populate('category', 'name');
      
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get all posts of a specific category
router.get('/categories/:categoryName/posts', async (req, res) => {
  try {
    const categoryName = req.params.categoryName;

    // Find the category by name
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Find all posts that have the category reference
    const posts = await Post.find({ category: category._id }).populate('author', 'username').populate('category', 'name');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all posts by a specific author
router.get('/authors/:authorUsername/posts', async (req, res) => {
  try {
    const authorUsername = req.params.authorUsername;

    // Find the user by the author's username
    const author = await User.findOne({ username: authorUsername });
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    // Find all posts with the author's ID
    const authorPosts = await Post.find({ author: author._id }).populate('author', 'username').populate('category', 'name');
    res.json(authorPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a post by ID
router.patch('/posts/:id', upload.single('image'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const { title, content} = req.body;
    if (title) post.title = title;
    if (content) post.content = content;

    // Update image only if a new image is uploaded
    if (req.file) {
      const imagePath = req.file.filename;
      // Remove old image if it exists
      post.image = imagePath;
    }

    post.updatedAt = Date.now();
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a post by ID
router.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Remove image if it exists
    if (post.image) {
      fs.unlinkSync(path.join(__dirname, '../images', post.image));
    }


    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;
