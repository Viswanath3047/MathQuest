const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDatabase = require('./db');
const User = require('./models/User');
const Score = require('./models/Score');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'mathquest-secret-key';
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const sanitizeUser = (user) => ({
  _id: user._id,
  username: user.username,
  email: user.email,
  createdAt: user.createdAt
});

const generateToken = (user) => jwt.sign(
  { id: user._id, email: user.email },
  JWT_SECRET,
  { expiresIn: '7d' }
);

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

app.use(cors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'MathQuest API is running.' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MathQuest API is running' });
});

app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body || {};

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email and password are required.' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const emailExists = await User.exists({ email: normalizedEmail });

  if (emailExists) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email: normalizedEmail,
    password: passwordHash
  });

  const token = generateToken(newUser);

  return res.status(201).json({
    message: 'User registered successfully.',
    token,
    user: sanitizeUser(newUser)
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = await User.findOne({ email: String(email).trim().toLowerCase() });

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = generateToken(user);

  return res.json({
    message: 'Login successful.',
    token,
    user: sanitizeUser(user)
  });
});

app.get('/api/leaderboard', async (req, res) => {
  const leaderboard = (await Score.find()
    .sort({ score: -1 })
    .limit(10)
    .lean())
    .map((entry) => ({
      name: entry.name,
      score: Number(entry.score),
      category: entry.category,
      difficulty: entry.difficulty,
      createdAt: entry.createdAt
    }));

  return res.json({ leaderboard });
});

app.post('/api/results', authMiddleware, async (req, res) => {
  const { name, category, difficulty, score, totalQuestions, percentage } = req.body || {};

  if (!name || !category || !difficulty || score === undefined) {
    return res.status(400).json({ message: 'Missing result fields.' });
  }

  const newEntry = await Score.create({
    name: String(name).trim(),
    category: String(category),
    difficulty: String(difficulty),
    score: Number(score),
    totalQuestions: Number(totalQuestions || 0),
    percentage: Number(percentage || 0)
  });

  return res.status(201).json({
    message: 'Result saved.',
    result: newEntry
  });
});

app.get('/api/profile/:email', async (req, res) => {
  const { email } = req.params;
  const normalizedEmail = String(email || '').toLowerCase();
  const user = await User.findOne({ email: normalizedEmail }).lean();

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const scoreEntries = await Score.find({
    name: { $regex: `^${escapeRegex(user.username)}$`, $options: 'i' }
  }).lean();
  const bestScore = scoreEntries.length ? Math.max(...scoreEntries.map((entry) => Number(entry.score || 0))) : 0;
  const totalGames = scoreEntries.length;
  const averageScore = totalGames ? Math.round(scoreEntries.reduce((sum, entry) => sum + Number(entry.score || 0), 0) / totalGames) : 0;

  const categoryCounts = {};
  const difficultyCounts = {};

  scoreEntries.forEach((entry) => {
    categoryCounts[entry.category] = (categoryCounts[entry.category] || 0) + 1;
    difficultyCounts[entry.difficulty] = (difficultyCounts[entry.difficulty] || 0) + 1;
  });

  const favoriteCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Mathematics';
  const favoriteDifficulty = Object.entries(difficultyCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'easy';
  const recentResult = scoreEntries.length ? scoreEntries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] : null;

  return res.json({
    username: user.username,
    email: user.email,
    bestScore,
    totalGames,
    averageScore,
    favoriteCategory,
    favoriteDifficulty,
    recentResult: recentResult ? `${recentResult.category} • ${recentResult.difficulty} • ${recentResult.score} pts` : 'No games played yet'
  });
});

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MathQuest API running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exitCode = 1;
  });
