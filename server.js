const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const toolsRoutes = require('./routes/tools');
const favRoutes = require('./routes/favourites');
const adminRoutes = require('./routes/admin');
const { initDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes ──
app.use('/api/auth',       authRoutes);
app.use('/api/tools',      toolsRoutes);
app.use('/api/favourites', favRoutes);
app.use('/api/admin',      adminRoutes);

// ── Admin panel ──
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

// ── Health ──
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// ── Init DB then start ──
initDB();
app.listen(PORT, () => {
  console.log(`\n🚀 AI Tools API running at http://localhost:${PORT}`);
  console.log(`🔑 Admin panel:          http://localhost:${PORT}/admin`);
  console.log(`📡 API base:             http://localhost:${PORT}/api`);
  console.log(`\nDefault admin credentials: admin / admin123`);
});
