const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Password hashing library
const jwt = require('jsonwebtoken'); // JWT library for token generation
const User = require('../models/User'); // User model for DB operations

// -------- Signup Route --------
router.post('/', (req, res) => {
  const { full_name, email, password } = req.body;

  // Validate input fields
  if (!full_name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }
  
  // Check if user already exists
  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: err });
    if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

    // Hash the password before saving to DB
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create new user in the database
    User.create(full_name, email, hashedPassword, (err, results) => {
      if (err) return res.status(500).json({ message: err });

      // Generate JWT token for the new user
      const token = jwt.sign(
        { user_id: results.insertId },
        process.env.JWT_SECRET || 'mysecretkey',
        { expiresIn: '1h' }
      );

      // Send success response with token
      res.status(201).json({ message: 'Signup successful', token });
    });
  });
});

module.exports = router;
