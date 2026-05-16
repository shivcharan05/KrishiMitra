const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   GET /api/users/profile/:email
// @desc    Fetch user profile by email
// @access  Public (Mocking Auth for Hackathon)
router.get('/profile/:email', async (req, res) => {
  try {
    const email = req.params.email;
    let user = await User.findOne({ email });

    // Auto-create user if they don't exist yet (simulating signup)
    if (!user) {
      user = new User({ email, name: "Anonymous Farmer" });
      await user.save();
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile and farm details
// @access  Public
router.put('/profile', async (req, res) => {
  try {
    const { email, name, location, photoURL, farmDetails } = req.body;

    if (!email) {
      return res.status(400).json({ msg: 'Email is required to update profile' });
    }

    // Find and update
    let user = await User.findOneAndUpdate(
      { email },
      { $set: { name, location, photoURL, farmDetails } },
      { new: true, upsert: true } // Creates if it doesn't exist
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
