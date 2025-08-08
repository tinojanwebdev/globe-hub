require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'tourism_db'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err.message);
  } else {
    console.log('MySQL connected...');
  }
});

// Register API (hash password)
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({ message: 'Missing fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send({ message: 'Email already registered' });
        }
        console.error('DB insert error:', err);
        return res.status(500).send({ message: 'Database error' });
      }
      return res.status(201).send({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).send({ message: 'Error registering user' });
  }
});

// Login API (compare hash)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Missing fields' });
  }

  const query = 'SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('DB select error:', err);
      return res.status(500).send({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const user = results[0];
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid credentials' });
      }
      const safeUser = { id: user.id, name: user.name, email: user.email };
      return res.send({ message: 'Login successful', user: safeUser });
    } catch (error) {
      console.error('Bcrypt compare error:', error);
      return res.status(500).send({ message: 'Server error' });
    }
  });
});

// Contact form submission API
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).send({ message: 'Please fill in all fields' });
  }

  const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('DB insert contact error:', err);
      return res.status(500).send({ message: 'Database error' });
    }
    return res.status(201).send({ message: 'Message received successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
