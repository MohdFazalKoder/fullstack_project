const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./db'); // MySQL connection

const app = express();

// Middleware 
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Test Route
app.get('/', (req, res) => res.send('Server is running'));

// Routes 
const signUpRoutes = require('./routes/signUpRoutes');
const loginRoutes = require('./routes/loginRoutes');
const fileRoutes = require('./routes/fileRoutes');

app.use('/api/users/signup', signUpRoutes);
app.use('/api/users/login', loginRoutes);
app.use('/api/files', fileRoutes);

// Start Server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
