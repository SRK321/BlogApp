// routes/user.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const User = require('../modules/User');
const upload = require('../modules/multerConfig'); // Import the multer configuration
const Post = require('../modules/Post')

// Update user information, including password and profile picture, by ID
router.put('/users/:userId', upload.single('profilePic'), async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email, password, phoneNumber } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the username is being changed
    let usernameChanged = false;
    if (username && username !== user.username) {
      usernameChanged = true;
      user.username = username;
    }

    // Update user properties if provided in the request body
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    // Update the profile picture if a new picture is uploaded
    if (req.file) {
      const profilePicPath = req.file.path;
      user.profilePic = profilePicPath;
    }

    // Update the password if a new password is provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
      user.password = hashedPassword;
    }

    // Save the updated user
    const updatedUser = await user.save();

    // If the username changed, update author name in all posts associated with the user
    if (usernameChanged) {
      await Post.updateMany({ author: userId }, { $set: { author: updatedUser._id } }); // Use the user's ObjectId
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
