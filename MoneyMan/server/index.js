const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect("mongodb+srv://womp:Womp@cluster0.3znw9ak.mongodb.net/niggam_alala", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  currency: Number
});
const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Brukernavn fins allerede' });
    }

    const newUser = new User({
      username: username,
      email: email,
      password: password,
      currency: 500,
    });
    await newUser.save();

    res.status(201).json({ message: 'Bruker opprettet' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Kunne ikke lage bruker' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: 'Feil brukernavn eller passord' });
    }

    res.status(200).json({ message: 'Du er logget inn' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//"proxy":"http://localhost:8080" - add to package.json when testing locally