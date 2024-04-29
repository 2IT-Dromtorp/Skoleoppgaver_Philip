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

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPassword = (password) => {
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\-|]+$/;
    return passwordRegex.test(password);
};

app.post('/api/v1/createuser', (req, res) => {
    const { email, password, role } = req.body;
    if (email === '' || password === '' || !role) {
        return res.status(400).send('Missing required fields');
    }
    if (!isValidEmail(email) || !isValidPassword(password)) {
        return res.status(400).send('Invalid email or password');
    }
    POOL.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error checking user:', err);
            return res.status(500).send('Error checking user');
        }

        if (results.length > 0) {
            return res.status(409).send('Email already exists');
        }
        POOL.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, password, role], (err, results) => {
            if (err) {
                console.error('Error creating user:', err);
                return res.status(500).send('Error creating user');
            }
            res.status(201).json({ message: 'User created successfully' });
        });
    });
});

app.post('/api/v1/login', (req, res) => {
    const { email, password } = req.body;
    if (email === '' || password === '') {
        return res.status(400).send('Missing required fields');
    }
    if (!isValidEmail(email) || !isValidPassword(password)) {
        return res.status(400).send('Invalid email or password');
    }
    POOL.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error checking user:', err);
            return res.status(500).send('Error checking user');
        }
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }
        if (results[0].password !== password) {
            return res.status(401).send('Invalid password');
        }
        res.status(200).json({ message: 'Login successful' });
    });
});

app.get('/api/v1/users', (req, res) => {
    POOL.query('SELECT * FROM users', (err, results) => {
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
