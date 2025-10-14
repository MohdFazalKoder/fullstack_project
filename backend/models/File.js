const db = require('../db');

// Add a file
const addFile = (userId, fileName, filePath, fileType, fileSize, callback) => {
  const sql =
    'INSERT INTO files (user_id, file_name, file_path, file_type, file_size) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [userId, fileName, filePath, fileType, fileSize], callback);
};

// Get all files for user
const getFilesByUser = (userId, callback) => {
  const sql = 'SELECT * FROM files WHERE user_id = ? ORDER BY upload_date DESC';
  db.query(sql, [userId], callback);
};

// Get file by name
const getFileByName = (fileName, callback) => {
  const sql = 'SELECT * FROM files WHERE file_name = ?';
  db.query(sql, [fileName], callback);
};

// Delete a file by file_name
const deleteFile = (fileName, callback) => {
  const sql = 'DELETE FROM files WHERE file_name = ?';
  db.query(sql, [fileName], callback);
};
module.exports = {
  addFile,
  getFilesByUser,
  deleteFile,
  getFileByName,
};
