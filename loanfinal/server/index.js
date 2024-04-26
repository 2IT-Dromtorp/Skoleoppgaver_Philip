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

app.get('/api/v1/users', (req, res) => {
    POOL.query('SELECT * FROM users', (err, results) => {
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
