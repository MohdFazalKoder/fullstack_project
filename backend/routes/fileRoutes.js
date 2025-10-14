const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const auth = require('../middlewares/auth');
const File = require('../models/File');  

// Multer 
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    const newFilename = Date.now() + '-' + file.originalname;
    callback(null, newFilename);
  }
});


const upload = multer({ storage });

// Upload Route 
router.post('/upload', auth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  File.addFile(
    req.user.user_id,
    req.file.originalname,
    req.file.filename,
    req.file.mimetype,
    req.file.size,
    (err, result) => {
      if (err) return res.status(500).json({ message: 'DB Error', error: err });
      res.json({ message: 'File uploaded and saved to DB', file: req.file.filename });
    }
  );
});

// Get single file by filename
router.get('/file/:filename', auth, (req, res) => {
  const { filename } = req.params;

  File.getFileByName(filename, (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    if (!results[0]) return res.status(404).json({ message: 'File not found' });

    const file = results[0];
    res.json({
      file_name: file.file_name,
      file_type: file.file_type,
      file_size: file.file_size,
      file_path: file.file_path,
      upload_date: file.upload_date,
      url: `http://localhost:5000/uploads/${file.file_name}`
    });
  });
});



// List files 
router.get('/files', auth, (req, res) => {
  File.getFilesByUser(req.user.user_id, (err, results) => {
    if (err) return res.status(500).json({ message: 'DB Error', error: err });
    res.json({ files: results });
  });
});

// Delete a file
router.delete('/files/:filename', auth, (req, res) => {
  const filePath = path.join('uploads', req.params.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  File.deleteFile(req.params.filename, (err, result) => {
    if (err) return res.status(500).json({ message: 'DB Error', error: err });
    res.json({ message: 'File deleted successfully' });
  });
});

module.exports = router;
