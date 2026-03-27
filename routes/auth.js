const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { DB } = require('../db');
const { authMiddleware, JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: 'Username, email and password required' });

    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters' });

    if (DB.getUserByEmail(email))
      return res.status(409).json({ error: 'Email already registered' });

    if (DB.getUserByUsername(username))
      return res.status(409).json({ error: 'Username taken' });

    const hash = await bcrypt.hash(password, 10);
    const user = DB.createUser({ username, email, password: hash });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET, { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Account created',
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' });

    const user = DB.getUserByEmail(email);
    if (!user)
      return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET, { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  const user = DB.getUserById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { password, ...safe } = user;
  res.json(safe);
});

// GET /api/auth/users (admin only)
router.get('/users', require('../middleware/auth').adminMiddleware, (req, res) => {
  const users = DB.getUsers().map(({ password, ...u }) => u);
  res.json({ total: users.length, users });
});

module.exports = router;
