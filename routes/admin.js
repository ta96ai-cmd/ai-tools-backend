const express = require('express');
const { DB } = require('../db');
const { adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// All routes require admin
router.use(adminMiddleware);

// ── DASHBOARD STATS ──
router.get('/dashboard', (req, res) => {
  const tools  = DB.getTools();
  const users  = DB.getUsers();
  const subs   = DB.getSubmissions();
  const favs   = DB.getFavs();

  const topFaved = {};
  favs.forEach(f => { topFaved[f.toolId] = (topFaved[f.toolId] || 0) + 1; });
  const topTools = Object.entries(topFaved)
    .sort((a,b) => b[1] - a[1])
    .slice(0, 5)
    .map(([toolId, count]) => {
      const t = DB.getToolById(toolId);
      return { tool: t?.name || 'Unknown', count };
    });

  const catCounts = {};
  tools.forEach(t => { catCounts[t.category] = (catCounts[t.category]||0)+1; });

  res.json({
    stats: {
      totalTools:   tools.length,
      activeTools:  tools.filter(t => t.approved !== false).length,
      totalUsers:   users.length,
      totalFavs:    favs.length,
      pendingSubs:  subs.filter(s => s.status === 'pending').length,
      approvedSubs: subs.filter(s => s.status === 'approved').length,
    },
    topFavedTools: topTools,
    toolsByCategory: catCounts,
    recentUsers: users.slice(-5).reverse().map(({ password, ...u }) => u),
    recentSubs: subs.slice(-5).reverse(),
  });
});

// ── TOOLS CRUD ──

// GET /api/admin/tools  — all tools (incl unapproved)
router.get('/tools', (req, res) => {
  const tools = DB.getTools();
  res.json({ total: tools.length, tools });
});

// POST /api/admin/tools  — create tool directly
router.post('/tools', (req, res) => {
  try {
    const { name, category, url, description, tags, free, icon } = req.body;
    if (!name || !category || !url)
      return res.status(400).json({ error: 'name, category, url required' });

    const tool = DB.createTool({
      name: name.trim(),
      category: category.trim(),
      url: url.trim(),
      description: description || '',
      tags: Array.isArray(tags) ? tags : (tags||'').split(',').map(t=>t.trim()).filter(Boolean),
      free: free !== false,
      icon: icon || '🔧',
      approved: true,
    });

    res.status(201).json({ message: 'Tool created', tool });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/tools/:id  — update tool
router.put('/tools/:id', (req, res) => {
  const tool = DB.updateTool(req.params.id, req.body);
  if (!tool) return res.status(404).json({ error: 'Tool not found' });
  res.json({ message: 'Tool updated', tool });
});

// DELETE /api/admin/tools/:id  — delete tool
router.delete('/tools/:id', (req, res) => {
  const deleted = DB.deleteTool(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Tool not found' });
  res.json({ message: 'Tool deleted' });
});

// ── SUBMISSIONS ──

// GET /api/admin/submissions
router.get('/submissions', (req, res) => {
  const { status } = req.query;
  let subs = DB.getSubmissions();
  if (status) subs = subs.filter(s => s.status === status);
  res.json({ total: subs.length, submissions: subs.reverse() });
});

// PUT /api/admin/submissions/:id/approve  — approve and add to tools
router.put('/submissions/:id/approve', (req, res) => {
  const sub = DB.getSubmissions().find(s => s.id === Number(req.params.id));
  if (!sub) return res.status(404).json({ error: 'Submission not found' });
  if (sub.status === 'approved') return res.status(409).json({ error: 'Already approved' });

  const tool = DB.createTool({
    name: sub.name, category: sub.category, url: sub.url,
    description: sub.description, tags: sub.tags,
    free: sub.free, icon: sub.icon, approved: true,
  });

  DB.updateSubmission(req.params.id, { status: 'approved', approvedAt: new Date().toISOString(), toolId: tool.id });

  res.json({ message: 'Submission approved and tool added', tool });
});

// PUT /api/admin/submissions/:id/reject
router.put('/submissions/:id/reject', (req, res) => {
  const sub = DB.updateSubmission(req.params.id, {
    status: 'rejected',
    rejectedAt: new Date().toISOString(),
    rejectionReason: req.body.reason || 'Does not meet criteria',
  });
  if (!sub) return res.status(404).json({ error: 'Submission not found' });
  res.json({ message: 'Submission rejected', submission: sub });
});

// ── USERS ──
router.get('/users', (req, res) => {
  const users = DB.getUsers().map(({ password, ...u }) => u);
  res.json({ total: users.length, users });
});

module.exports = router;
