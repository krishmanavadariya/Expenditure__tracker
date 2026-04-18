// Full corrected insert.js
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('project'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: "email",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/project", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('connected', () => console.log("Connected to database"));
db.on('error', err => console.log("Error in connection:", err));

// User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, min: 0 }
});
const Users = mongoose.model("user", userSchema, "user");

// Register API
app.post('/api/register', async (req, res) => {
    try {
        const { username, age, gender, email, password } = req.body;
        const existingUser = await Users.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({ username, age, gender, email, password: hashedPassword });
        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Server error during registration" });
    }
});

// Login API
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.email = email;
            res.json({ message: "Login successful", isAuthenticated: true });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
});

// Session API
app.get('/api/session', (req, res) => {
    if (req.session.email) {
        res.json({ isAuthenticated: true, email: req.session.email });
    } else {
        res.status(401).json({ isAuthenticated: false });
    }
});

// Logout API
app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out successfully" });
    });
});

// Expenditure schema
const expenditureSchema = new mongoose.Schema({
    email: { type: String, required: true },
    income: { type: Number, required: true },
    expense: { type: Number, required: true },
    totalExpenditure: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    description: { type: String },
    date: { type: Date, default: Date.now }
});
const Expenditure = mongoose.model("expenditure", expenditureSchema, "expenditure");

// Add expenditure API
app.post('/api/addexpenditure', (req, res) => {
    const { email, income, expense, totalExpenditure, balance, description } = req.body;
    const newExpenditure = new Expenditure({
        email,
        income,
        expense,
        totalExpenditure,
        balance,
        description,
        date: new Date()
    });

    newExpenditure.save()
        .then(() => res.json({ message: "Expenditure added successfully" }))
        .catch(err => {
            console.error("Error saving expenditure:", err);
            res.status(500).json({ message: "Error adding expenditure" });
        });
});

// View expenditures API
app.get('/api/viewexpenditure', (req, res) => {
    const userEmail = req.session.email; // Retrieve user's email from the session
    if (!userEmail) {
        return res.status(401).json({ message: "Session expired. Please log in again." });
    }

    // Filter records by logged-in user's email
    Expenditure.find({ email: userEmail })
        .then(result => res.json(result))
        .catch(err => {
            console.error("Error retrieving expenditure:", err);
            res.status(500).json({ message: "Error retrieving expenditure" });
        });
});

// View users API
app.get('/api/viewuser', (req, res) => {
    Users.find()
        .then(result => res.json(result))
        .catch(err => {
            console.error("Error retrieving users:", err);
            res.status(500).json({ message: "Error retrieving users" });
        });
});

// Default route
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/project/register.html");
});

// Start server
app.listen(3000, () => {
    console.log("Server started at port 3000");
});
