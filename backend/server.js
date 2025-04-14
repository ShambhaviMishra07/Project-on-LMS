const express = require('express');
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
  if (err) throw err;
  console.log('Connected to MySQL!');
});

// Routes

// Get all books
app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new book
app.post('/books', (req, res) => {
  const { title, author, genre, year } = req.body;
  db.query(
    'INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)',
    [title, author, genre, year],
    (err, results) => {
      if (err) throw err;
      res.status(201).json({ message: 'Book added successfully' });
    }
  );
});

// Other routes can be created for editing, deleting books, etc.

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
