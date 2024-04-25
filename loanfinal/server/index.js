const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
app.use(cors());

app.use(express.json());

const POOL = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'loandb'
});

app.post('/api/v1/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    POOL.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Failed to create user' });
        }
        res.status(201).json({ message: 'User created successfully', userId: results.insertId });
    });
});

app.get('/api/v1/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    POOL.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: 'Failed to fetch user' });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.json({ message: 'Login successful', userId: results[0].id });
    });
});

app.get('/api/users', (req, res) => {
    POOL.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Failed to fetch users' });
        }

        res.json(results);
    });
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
