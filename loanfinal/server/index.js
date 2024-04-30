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

app.post('/api/v1/accounts/create', (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ success: false, message: 'Please provide email, password, and role' });
    }
    POOL.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        if (results.length > 0) {
            return res.status(409).json({ success: false, message: 'Email already exists' });
        }
        POOL.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, password, role], (insertErr, insertResults) => {
            if (insertErr) {
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
            res.status(201).json({ success: true, message: 'User created successfully' });
        });
    });
});

app.post('/api/v1/accounts/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    POOL.query('SELECT user_id, email FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const user = results[0];
        const user_id = user.user_id;

        res.status(200).json({ success: true, message: 'Login successful', user_id: user_id });
    });
});

app.get('/api/v1/users', (req, res) => {
    POOL.query('SELECT user_id, email, role FROM users', (err, results) => {
        res.send(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
