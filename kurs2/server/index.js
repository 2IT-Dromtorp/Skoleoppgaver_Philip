// /api/adduser

// /api/login

// /api/is_registered

// /api/unregister

// /api/register

const express = require('express');
const app = express();
const port = 3001;

app.post('/login', (req, res) => {
    res.status(200).json({ status: 'S', message: 'Hallai' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});