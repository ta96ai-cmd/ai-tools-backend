const express = require('express');
const { DB } = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/tools  — list all approved tools (+ search/filter)
router.get('/', (req, res) => {
  try {
    let tools = DB.getTools().filter(t => t.approved !== false);

    const { q, category, free, sort } = req.query;

    if (q) {
      const query = q.toLowerCase();
      tools = tools.filter(t =>
        t.name.toLowerCase().includes(query) ||
        (t.description || '').toLowerCase().includes(query) ||
        (t.tags || []).some(tag => tag.toLowerCase().includes(query)) ||
        (t.category || '').toLowerCase().includes(query)
      );
    }

    if (category) {
      tools = tools.filter(t => t.category.toLowerCase() === category.toLowerCase());
    }

    if (free === 'true')  tools = tools.filter(t => t.free === true);
    if (free === 'false') tools = tools.filter(t => t.free === false);

    if (sort === 'name')     tools.sort((a,b) => a.name.localeCompare(b.name));
    if (sort === 'category') tools.sort((a,b) => a.category.localeCompare(b.category));
    if (sort === 'newest')   tools.sort((a,b) => new Date(b.createdAt||0) - new Date(a.createdAt||0));

    res.json({ total: tools.length, tools });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/tools/categories  — all unique categories
router.get('/categories', (req, res) => {
  const tools = DB.getTools().filter(t => t.approved !== false);
  const cats = {};
  tools.forEach(t => {
    cats[t.category] = (cats[t.category] || 0) + 1;
  });
  const result = Object.entries(cats)
    .map(([name, count]) => ({ name, count }))
    .sort((a,b) => a.name.localeCompare(b.name));
  res.json({ total: result.length, categories: result });
});

// GET /api/tools/stats  — summary stats
router.get('/stats', (req, res) => {
  const tools = DB.getTools();
  const approved = tools.filter(t => t.approved !== false);
  const freeCount = approved.filter(t => t.free).length;
  const cats = new Set(approved.map(t => t.category)).size;
  res.json({
    totalTools: approved.length,
    freeTools: freeCount,
    paidTools: approved.length - freeCount,
    categories: cats,
    pendingSubmissions: DB.getSubmissions().filter(s => s.status === 'pending').length,
  });
});

// GET /api/tools/:id
router.get('/:id', (req, res) => {
  const tool = DB.getToolById(req.params.id);
  if (!tool) return res.status(404).json({ error: 'Tool not found' });
  res.json(tool);
});

// POST /api/tools/submit  — user submits a new tool for review
router.post('/submit', authMiddleware, (req, res) => {
  try {
    const { name, category, url, description, tags, free, icon } = req.body;

    if (!name || !category || !url)
      return res.status(400).json({ error: 'name, category, url required' });

    const sub = DB.addSubmission({
      name: name.trim(),
      category: category.trim(),
      url: url.trim(),
      description: description || '',
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map(t => t.trim()).filter(Boolean),
      free: free !== false,
      icon: icon || '🔧',
      submittedBy: req.user.id,
      submittedByName: req.user.username,
    });

    res.status(201).json({ message: 'Tool submitted for review', submission: sub });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
