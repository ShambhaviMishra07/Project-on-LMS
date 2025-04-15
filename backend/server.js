const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('frontend'));

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'silent1234soul',
  database: 'library_db'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Routes

// Get all books
app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).json({ message: 'Error fetching books' });
    } else {
      res.json(results);
    }
  });
});

// Add a new book
app.post('/books', (req, res) => {
  const { title, author, genre, year } = req.body;
  if (!title || !author || !genre || !year) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  db.query(
    'INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)',
    [title, author, genre, year],
    (err, results) => {
      if (err) {
        console.error('Error adding book:', err);
        res.status(500).json({ message: 'Error adding book' });
      } else {
        res.status(201).json({ message: 'Book added successfully' });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});