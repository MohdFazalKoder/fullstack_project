const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/', (req, res) => {
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }
  
  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: err });
    if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = bcrypt.hashSync(password, 10);

    User.create(full_name, email, hashedPassword, (err, results) => {
      if (err) return res.status(500).json({ message: err });

      const token = jwt.sign(
        { user_id: results.insertId },
        process.env.JWT_SECRET || 'mysecretkey',
        { expiresIn: '1h' }
      );

      res.status(201).json({ message: 'Signup successful', token });
    });
  });
});

module.exports = router;
