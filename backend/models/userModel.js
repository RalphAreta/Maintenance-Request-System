const db = require('../config/db');  // Assuming db connection is set up in this file

// Create a new user
const createUser = (name, username, email, password, callback) => {
  const query = 'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)';
  db.query(query, [name, username, email, password], (err, result) => {
    callback(err, result);
  });
};

// Find user by email
const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      callback(err, null); // Pass the error to the callback
    } else if (result && result.length > 0) {
      callback(null, result[0]); // Return the first result if found
    } else {
      callback(null, null); // No results found
    }
  });
};

// Example usage of db.query with sql and params
const exampleQuery = (userId, callback) => {
  const sql = 'SELECT * FROM users WHERE id = ?'; // Define the SQL query
  const params = [userId]; // Define the parameters for the query

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      callback(err, null);
    } else if (result && result.length > 0) {
      callback(null, result[0]); // Return the first result if found
    } else {
      callback(null, null); // No results found
    }
  });
};

module.exports = { createUser, findUserByEmail, exampleQuery };