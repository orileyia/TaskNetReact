const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage (replace with a database in a real application)
let users = [];
let jobs = [];

// JWT secret (use a strong, environment-specific secret in production)
const JWT_SECRET = 'your-secret-key';

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
};

// Routes
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (users.find(user => user.email === email)) {
      return res.status(400).send({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = { id: users.length + 1, name, email, password: hashedPassword };
    users.push(newUser);
    const token = generateToken(newUser);
    res.status(201).send({ auth: true, token });
  } catch (error) {
    res.status(500).send({ message: 'Error signing up', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (!user) return res.status(404).send({ message: 'User not found' });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).send({ auth: false, token: null });
    const token = generateToken(user);
    res.status(200).send({ auth: true, token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error: error.message });
  }
});

app.post('/api/jobs', verifyToken, (req, res) => {
  try {
    const { title, description, category, budget, deadline } = req.body;
    const newJob = { id: jobs.length + 1, title, description, category, budget, deadline, userId: req.userId };
    jobs.push(newJob);
    res.status(201).send(newJob);
  } catch (error) {
    res.status(500).send({ message: 'Error creating job', error: error.message });
  }
});

app.get('/api/jobs', (req, res) => {
  try {
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching jobs', error: error.message });
  }
});

app.get('/api/jobs/:id', (req, res) => {
  try {
    const job = jobs.find(job => job.id === parseInt(req.params.id));
    if (!job) return res.status(404).send({ message: 'Job not found' });
    res.status(200).send(job);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching job', error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});