const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://poll_game:921182@cluster0.3eckf.mongodb.net/poll_game';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.error('MongoDB connection error:', error));

// User schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Score schema and model
const scoreSchema = new mongoose.Schema({
    username: { type: String, required: true },
    score: { type: Number, required: true },
});

const Score = mongoose.model('Score', scoreSchema);

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    try {
        await user.save();
        res.json({ message: 'Registration successful!' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user' });
    }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username }, 'secretkey'); // Replace 'secretkey' with your secret key
        res.json({ token }); // Send token to the client
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Submit score endpoint
app.post('/api/scores', async (req, res) => {
    const { username, score } = req.body;

    // Check if the user has already played
    const existingScore = await Score.findOne({ username });
    if (existingScore) {
        return res.status(400).json({ message: 'User has already played the game.' });
    }

    const scoreEntry = new Score({ username, score });

    try {
        await scoreEntry.save();
        res.json({ message: 'Score submitted!' });
    } catch (error) {
        res.status(400).json({ message: 'Error submitting score' });
    }
});

// Get score endpoint to check if user has played
app.get('/api/scores', async (req, res) => {
    const { username } = req.query;
    const scoreEntry = await Score.findOne({ username });
    
    if (scoreEntry) {
        return res.status(200).json({ played: true, score: scoreEntry.score });
    } else {
        return res.status(404).json({ played: false });
    }
});

// Redirect to register page on server start
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/register.html'); // Register page ko dikhana
});

// Start server
const PORT = process.env.PORT || 3000; // Use the port provided by Render
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
