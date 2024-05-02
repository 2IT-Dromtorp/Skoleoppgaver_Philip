const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require('mongodb');
app.use(cors());

app.use(express.json());

const mongodbURL = "mongodb+srv://womp:Womp@cluster0.3znw9ak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const mongoClient = new MongoClient(mongodbURL);
async function main() {
    await mongoClient.connect();

    const mainDB = mongoClient.db('loandb');
    const usersCol = mainDB.collection('users');
    const loansCol = mainDB.collection('loans');
    const studentsCol = mainDB.collection('students');
    const teachersCol = mainDB.collection('teachers');
    const adminsCol = mainDB.collection('admins');
    const equipmentCol = mainDB.collection('equipment');

    //Complete
    app.post('/api/v1/accounts/create', async (req, res) => {
        const { first_name, last_name, phone_number, email, password, conf_password, role } = req.body;
        if (!first_name || !last_name || !phone_number || !email || !password || !conf_password || !role) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send("Invalid email format");
        }
        if (!passwordRegex.test(password)) {
            return res.status(400).send("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number");
        }
        if (password !== conf_password) {
            return res.status(400).send("Passwords don't match");
        }
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const dupeUser = await usersCol.findOne({ email: email });
            if (dupeUser) {
                return res.status(409).send("Email already in use");
            }
            try {
                const insertRes = await usersCol.insertOne({
                    email: email,
                    password: hashedPassword,
                    role: role,
                    profile_picture: "https://i.ibb.co/wYm1rhC/default-profile.jpg",
                    created_at: new Date(),
                });
                try {
                    const column = role === 'Student' ? studentsCol : role === 'Teacher' ? teachersCol : role === 'System Administrator' ? adminsCol : undefined;
                    if (!column) return res.status(400).send("Role is NOT right OK!")
                    const insertRes2 = await column.insertOne({ user: insertRes.insertedId, first_name: first_name, last_name: last_name, phone_number: phone_number });
                    res.status(201).json({ success: true, message: 'User created successfully' });
                } catch (error) {
                    console.error(error);
                    res.status(500).send("Internal Server Error");
                }
            } catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });

    //Complete
    app.post('/api/v1/accounts/login', async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        try {
            const user = await usersCol.findOne({ email: email });
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
            console.log('User Info:', user);
            res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                user: user
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });

    //TODO Finish this
    app.get('/api/v1/accounts/:role/:id', async (req, res) => {
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

}

main();