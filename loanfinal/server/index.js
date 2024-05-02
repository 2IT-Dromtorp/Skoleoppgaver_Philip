const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { MongoClient, ObjectId } = require('mongodb')
app.use(cors());
app.use(express.json());

const mongodbURL = "mongodb+srv://womp:Womp@cluster0.3znw9ak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const mongoClient = new MongoClient(mongodbURL);
async function main() {

    await mongoClient.connect();

    const mainDB = mongoClient.db('loandb');
    const usersCol = mainDB.collection('users');
    const studentsCol = mainDB.collection('students');
    const teachersCol = mainDB.collection('teachers');
    const adminsCol = mainDB.collection('admins');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const phoneRegex = /^\d{8}$/;

    app.post('/api/v1/account/create', async (req, res) => {
        const { first_name, last_name, phone_number, email, password, conf_password, role, className } = req.body;
    
        if (!first_name || !last_name || !phone_number || !email || !password || !conf_password || !role || !className) {
            return res.status(400).json({ error: "All fields are required." });
        }
    
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }
    
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password must be at least 8 characters long and include at least one number, one uppercase and one lowercase letter." });
        }
    
        if (!phoneRegex.test(phone_number)) {
            return res.status(400).json({ error: "Phone number must be exactly 8 digits long." });
        }
    
        const emailExists = await studentsCol.findOne({ email }) || await teachersCol.findOne({ email }) || await adminsCol.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ error: "Email already exists." });
        }
    
        if (password !== conf_password) {
            return res.status(400).json({ error: "Passwords do not match." });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = new ObjectId();
        const colToIns = role === 'Student' ? studentsCol : role === 'Teacher' ? teachersCol : role === 'Admin' ? adminsCol : undefined;
        if (!colToIns) return res.status(400).send("Invalid role");
    
        // Attempt to insert into the appropriate collection and catch any errors
        try {
            const roleInsRes = await colToIns.insertOne({
                first_name, last_name, phone_number, email, userId, className
            });
            
            await usersCol.insertOne({
                email, hashedPassword, role, userId, roleId: roleInsRes.insertedId
            });
    
            const sessionToken = jwt.sign({
                userId
            }, "sJ4T#7D9yG%f^M6A", { expiresIn: '7d' });
    
            res.status(201).json({
                message: "User created successfully.",
                token: sessionToken,
            });
        } catch (error) {
            console.error("Database operation failed:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
    
    app.post('/api/v1/account/login', async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await usersCol.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Invalid email or password." });
            }
            const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
            if (!passwordMatch) {
                return res.status(400).json({ error: "Invalid email or password." });
            }
            let detailsCollection;
            switch (user.role) {
                case 'Student':
                    detailsCollection = studentsCol;
                    break;
                case 'Teacher':
                    detailsCollection = teachersCol;
                    break;
                case 'Admin':
                    detailsCollection = adminsCol;
                    break;
                default:
                    return res.status(400).json({ error: "Invalid user role." });
            }
            const userDetails = await detailsCollection.findOne({ userId: user.userId });
            console.log({
                userInfo: {
                    email: user.email,
                    role: user.role,
                    userId: user.userId,
                    hashedPassword: user.hashedPassword,
                    default_profile: user.default_profile
                },
                personInfo: userDetails
            });
            const token = jwt.sign({ userId: user.userId }, "sJ4T#7D9yG%f^M6A", { expiresIn: '7d' });
            res.status(200).json({
                token: token,
                userDetails: userDetails
            });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    app.post('/api/v1/equipment/add-equipment', async (req, res) => {
    });

    app.get('/api/v1/user', async (req, res) => {
    });

    app.post('/api/v1/users', async (req, res) => {
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();