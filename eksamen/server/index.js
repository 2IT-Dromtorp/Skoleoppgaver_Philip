const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
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

    app.post('/api/v1/register', async (req, res) => {
        const { name, email, password, confirmPassword } = req.body;
        console.log(req.body);

        if (password !== confirmPassword) {
            res.status(400).json({ success: false, error: 'Passwords do not match' });
            return;
        }

        const user = await usersCol.findOne({ email });
        if (user) {
            res.status(400).json({ success: false, error: 'User already exists' });
            return;
        }

        const result = await usersCol.insertOne({ name, email, password, profile_picture: 'https://cdn.auth0.com/avatars/u.png', sport: [] });
        res.json({ success: true, result });
    });

    app.post('/api/v1/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await usersCol.findOne({ email, password });

        if (user) {
            const token = jwt.sign({ email: user.email, id: user._id, profile_picture: user.profile_picture, name: user.name }, secretKey, { expiresIn: '99999999999999999999999999d' });
            res.json({ success: true, token, user });
        } else {
            res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
    });

    app.get('/api/v1/tournaments', async (req, res) => {
        const tournaments = await mainDB.collection('tournaments').find().toArray();
        res.json(tournaments);
    });

    app.post('/api/v1/tournaments/:id/register', authenticateToken, async (req, res) => {
        const tournamentId = req.params.id;
        const userId = req.user.id;

        const result = await mainDB.collection('tournaments').updateOne(
            { _id: new ObjectId(tournamentId) },
            { $addToSet: { registered_users: new ObjectId(userId) } }
        );

        if (result.modifiedCount > 0) {
            res.json({ success: true, message: 'User registered successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Failed to register user' });
        }
    });

    app.post('/api/v1/tournaments/:id/unregister', authenticateToken, async (req, res) => {
        const tournamentId = req.params.id;
        const userId = req.user.id;
    
        const result = await mainDB.collection('tournaments').updateOne(
            { _id: new ObjectId(tournamentId) },
            { $pull: { registered_users: new ObjectId(userId) } }
        );
    
        if (result.modifiedCount > 0) {
            res.json({ success: true, message: 'User unregistered successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Failed to unregister user' });
        }
    });    

    app.get('/api/v1/registered-tournaments', authenticateToken, async (req, res) => {
        const userId = req.user.id;
        const tournaments = await mainDB.collection('tournaments').find({ registered_users: new ObjectId(userId) }).toArray();
        res.json(tournaments);
    });

    app.post('/api/v1/sport/:sport/signup', authenticateToken, async (req, res) => {
        const { sport } = req.params;
        const userId = req.user.id;
    
        try {
            const result = await usersCol.updateOne(
                { _id: new ObjectId(userId) },
                { $addToSet: { sport } }
            );
    
            if (result.modifiedCount > 0) {
                res.json({ success: true, message: `Signed up for ${sport}` });
            } else {
                res.status(400).json({ success: false, message: 'Failed to sign up' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });
    
    app.post('/api/v1/sport/:sport/signoff', authenticateToken, async (req, res) => {
        const { sport } = req.params;
        const userId = req.user.id;
    
        try {
            const result = await usersCol.updateOne(
                { _id: new ObjectId(userId) },
                { $pull: { sport } }
            );
    
            if (result.modifiedCount > 0) {
                res.json({ success: true, message: `Signed off from ${sport}` });
            } else {
                res.status(400).json({ success: false, message: 'Failed to sign off' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });

    app.get('/api/v1/user-info', authenticateToken, async (req, res) => {
        const userId = req.user.id;
    
        try {
            const user = await usersCol.findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } });
            if (user) {
                res.json({ success: true, user });
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
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
