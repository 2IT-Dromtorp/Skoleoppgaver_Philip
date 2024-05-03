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
            return res.status(400).json({ error: "All fields are required.", success: false });
        }
    
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format.", success: false });
        }
    
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password must be at least 8 characters long and include at least one number, one uppercase and one lowercase letter.", success: false });
        }
    
        if (!phoneRegex.test(phone_number)) {
            return res.status(400).json({ error: "Phone number must be exactly 8 digits long.", success: false });
        }
    
        const emailExists = await studentsCol.findOne({ email }) || await teachersCol.findOne({ email }) || await adminsCol.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ error: "Email already exists.", success: false });
        }
    
        if (password !== conf_password) {
            return res.status(400).json({ error: "Passwords do not match.", success: false });
        }
    
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userId = new ObjectId();
            const colToIns = role === 'Student' ? studentsCol : role === 'Teacher' ? teachersCol : role === 'Admin' ? adminsCol : undefined;
            if (!colToIns) return res.status(400).json({ error: "Invalid role", success: false });
    
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
                success: true
            });
        } catch (error) {
            console.error("Database operation failed:", error);
            res.status(500).json({ error: "Internal server error", success: false });
        }
    });

    app.post('/api/v1/account/login', async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }
    
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
                case 'Student': detailsCollection = studentsCol; break;
                case 'Teacher': detailsCollection = teachersCol; break;
                case 'Admin': detailsCollection = adminsCol; break;
                default:
                    return res.status(400).json({ error: "Invalid user role." });
            }
    
            const userDetails = await detailsCollection.findOne({ userId: user.userId });
            if (!userDetails) {
                return res.status(404).json({ error: "User details not found." });
            }
    
            const token = jwt.sign(
                { userId: user.userId, role: user.role, firstName: userDetails.first_name, lastName: userDetails.last_name, className: userDetails.className },
                "sJ4T#7D9yG%f^M6A",
                { expiresIn: '7d' }
            );
    
            res.status(200).json({
                token: token,
                userDetails: userDetails
            });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });    

    // TODO legg til utstyr for loan.js
    app.post('/api/v1/equipment/add-equipment', async (req, res) => {
    });

    const authenticate = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, 'sJ4T#7D9yG%f^M6A');
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(403).json({ error: 'Forbidden, invalid token' });
        }
    };
    
    app.post('/api/v1/user', authenticate, async (req, res) => {
        const { userId } = req.body; // Get userId from the body
    
        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }
    
        // You would typically determine the collection based on the user's role saved in the token
        // Assume req.user.role has the role from the authenticated token
        const { role } = req.user;
        const detailsCollection = role === 'Student' ? studentsCol : role === 'Teacher' ? teachersCol : role === 'Admin' ? adminsCol : undefined;
    
        if (!detailsCollection) {
            return res.status(400).json({ error: "Invalid role" });
        }
    
        try {
            const userDetails = await detailsCollection.findOne(
                { userId },
                { projection: { _id: 0, first_name: 1, last_name: 1 } }
            );
    
            if (!userDetails) {
                return res.status(404).json({ error: "User details not found." });
            }
    
            res.status(200).json(userDetails); // Return the user details
        } catch (error) {
            console.error("Database operation failed:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });        

    app.post('/api/v1/users', async (req, res) => {
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();