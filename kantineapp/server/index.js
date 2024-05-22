const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

app.use(cors());
app.use(express.json());

const mongodbURL = "mongodb+srv://womp:Womp@cluster0.3znw9ak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoClient = new MongoClient(mongodbURL);

async function main() {
    await mongoClient.connect();
    const mainDB = mongoClient.db('kantinaDB');
    const usersCol = mainDB.collection('users');
    const productsCol = mainDB.collection('products')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const phoneRegex = /^\d{8}$/;

    app.post('/api/v1/register', async (req, res) => {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format.", success: false });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password must be at least 8 characters long and include at least one number, one uppercase and one lowercase letter.", success: false });
        }

        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ error: "Phone number must be exactly 8 digits long.", success: false });
        }

        const emailExists = await usersCol.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ error: "Email already exists.", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await usersCol.insertOne({ name, email, password: hashedPassword, phone, currency: 999999, url: "https://miro.medium.com/v2/resize:fit:720/1*_ARzR7F_fff_KI14yMKBzw.png" });

        return res.status(201).json({ success: true });
    });

    app.post('/api/v1/login', async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const user = await usersCol.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        console.log(user);

        return res.status(200).json({ success: true, user: user });
    });

    app.get('/api/v1/user', async (req, res) => {
        const { userId } = req.body;
    })

    app.get('/api/v1/users', async (req, res) => {
        try {
            const users = await usersCol.find().toArray();
            return res.status(200).json(users);
        } catch {
            console.error('Error fetching users', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/api/v1/products', async (req, res) => {
        try {
            const products = await productsCol.find().toArray();
            return res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main().catch(console.error);
