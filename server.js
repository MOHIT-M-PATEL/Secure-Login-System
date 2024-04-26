const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:64109','http://localhost:5000'],
    credentials: true 
}));


// MongoDB setup
mongoose.connect('mongodb://localhost:27017/sessionDB', { useNewUrlParser: true, useUnifiedTopology: true });
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);



app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Received Signup request:', { username, hashedPassword});
        const newUser = await User.create({ username, password: hashedPassword });
        res.json({ message: 'Signup successful', user: newUser });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error signing up' });
    }
});

// Route to handle user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received Login request:', { username});
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            req.session.userId = user._id;
            req.session.username = user.username; // Include username in session data
            res.cookie('sessionId', req.sessionID, {
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                sameSite: 'strict'
            });
            
            res.json({ message: 'Login successful', username: user.username }); // Send username in response
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Route to check if user is authenticated
app.get('/checkAuth', (req, res) => {
    if (req.session.userId) {
        res.json({ authenticated: true, username: req.session.username }); // Send username along with authentication status
    } else {
        res.json({ authenticated: false });
    }
});


// Route to handle user logout
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error logging out' });
        } else {
            res.clearCookie('connect.sid');
            res.clearCookie('sessionId');
            res.json({ message: 'Logout successful' });
        }
    });
});



// Welcome page route
app.get('/welcome', (req, res) => {
    if (req.session.userId) {
        res.send(`Welcome, ${req.session.username}!`); // Display welcome message with username
    } else {
        res.status(401).send('Unauthorized'); // Redirect to login page if not authenticated
    }
});



// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
