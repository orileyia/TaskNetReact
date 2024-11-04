const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jobportal', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB:', error));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// JWT secret (use a strong, environment-specific secret in production)
const JWT_SECRET = 'your-secret-key';

// Mongoose models
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  budget: Number,
  deadline: Date,
  userId: mongoose.Schema.Types.ObjectId,
});

const User = mongoose.model('User', UserSchema);
const Job = mongoose.model('Job', JobSchema);

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
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
    if (await User.findOne({ email })) {
      return res.status(400).send({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    const token = generateToken(newUser);
    res.status(201).send({ auth: true, token });
  } catch (error) {
    res.status(500).send({ message: 'Error signing up', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: 'User not found' });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).send({ auth: false, token: null });
    const token = generateToken(user);
    res.status(200).send({ auth: true, token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error: error.message });
  }
});

app.post('/api/jobs', verifyToken, async (req, res) => {
  try {
    const { title, description, category, budget, deadline } = req.body;
    const newJob = new Job({
      title,
      description,
      category,
      budget,
      deadline,
      userId: req.userId,
    });
    await newJob.save();
    res.status(201).send(newJob);
  } catch (error) {
    res.status(500).send({ message: 'Error creating job', error: error.message });
  }
});

app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching jobs', error: error.message });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).send({ message: 'Job not found' });
    res.status(200).send(job);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching job', error: error.message });
  }
});

app.delete('/api/jobs/:id', verifyToken, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).send({ message: 'Job not found' });
    if (job.userId.toString() !== req.userId) return res.status(403).send({ message: 'Unauthorized' });
    
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting job', error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
