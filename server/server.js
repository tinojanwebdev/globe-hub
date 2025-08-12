require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create MySQL connection using env variables
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Make12Admin1',  // <-- changed here to DB_PASSWORD
  database: process.env.DB_NAME || 'globehub',
  port: process.env.DB_PORT || 3306,
});


// Debug log for connection config
console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err.message);
  } else {
    console.log('MySQL connected...');
  }
});

// Simple test route for GET /
app.get('/', (req, res) => {
  res.send('Backend API is running!');
});

// Register API: Save user with hashed password
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email already registered' });
        }
        console.error('DB insert error:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      return res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'Error registering user' });
  }
});

// Login API: Check password and return user info
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const query = 'SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('DB select error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      // Do NOT send password back
      const safeUser = { id: user.id, name: user.name, email: user.email };
      return res.json({ message: 'Login successful', user: safeUser });
    } catch (error) {
      console.error('Bcrypt compare error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
});

// Contact form API: save messages
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('DB insert contact error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    return res.status(201).json({ message: 'Message received successfully' });
  });
});

// Start server, listen on all interfaces (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
