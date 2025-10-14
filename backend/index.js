const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./db'); // MySQL connection

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test route
app.get('/', (req, res) => res.send('Server is running'));

// ---------------- Routes ----------------
const signUpRoutes = require('./routes/signUpRoutes');
const loginRoutes = require('./routes/loginRoutes');
const fileRoutes = require('./routes/fileRoutes'); // ✅ File routes

app.use('/api/users/signup', signUpRoutes);
app.use('/api/users/login', loginRoutes);
app.use('/api/files', fileRoutes); // ✅ Mount file routes

// ---------------- Start server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running at: http://localhost:${PORT}`)
);
