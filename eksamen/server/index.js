const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

app.use(cors());
app.use(express.json());

const mongodbURL = "mongodb+srv://womp:Womp@cluster0.3znw9ak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoClient = new MongoClient(mongodbURL);

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

async function main() {
    await mongoClient.connect();
    const mainDB = mongoClient.db('eksamenDB');
    const usersCol = mainDB.collection('users');

    app.post('/api/v1/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await usersCol.findOne({ email, password });

        if (user) {
            const token = jwt.sign({ email: user.email, id: user._id, profile_picture: user.profile_picture, name: user.name }, secretKey, { expiresIn: '1h' });
            res.json({ success: true, token, user });
        } else {
            res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
    });

    app.get('/api/v1/protected-route', authenticateToken, (req, res) => {
        res.json({ message: 'This is a protected route', user: req.user });
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

main().catch(console.error);
