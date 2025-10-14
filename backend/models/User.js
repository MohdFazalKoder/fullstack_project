const db = require('../db'); // MySQL connection
// Get User
const User = {
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], callback);
  },

  // Create User
  create: (full_name, email, password, callback) => {
    const query = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
    db.query(query, [full_name, email, password], callback);
  }
};

module.exports = User;
