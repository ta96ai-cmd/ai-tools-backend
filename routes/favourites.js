const express = require('express');
const { DB } = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// All routes require auth
router.use(authMiddleware);

// GET /api/favourites  — get my favourites (with tool details)
router.get('/', (req, res) => {
  const favs = DB.getFavsByUser(req.user.id);
  const tools = DB.getTools();
  const result = favs.map(f => {
    const tool = tools.find(t => t.id === f.toolId);
    return { ...f, tool: tool || null };
  }).filter(f => f.tool);
  res.json({ total: result.length, favourites: result });
});

// POST /api/favourites/:toolId  — add favourite
router.post('/:toolId', (req, res) => {
  const tool = DB.getToolById(req.params.toolId);
  if (!tool) return res.status(404).json({ error: 'Tool not found' });

  const result = DB.addFav(req.user.id, req.params.toolId);
  if (result.already) return res.status(409).json({ message: 'Already in favourites' });

  res.status(201).json({ message: `${tool.name} added to favourites`, favourite: result });
});

// DELETE /api/favourites/:toolId  — remove favourite
router.delete('/:toolId', (req, res) => {
  const removed = DB.removeFav(req.user.id, Number(req.params.toolId));
  if (!removed) return res.status(404).json({ error: 'Not in favourites' });
  res.json({ message: 'Removed from favourites' });
});

// GET /api/favourites/check/:toolId  — is this tool favourited?
router.get('/check/:toolId', (req, res) => {
  const favs = DB.getFavsByUser(req.user.id);
  const isFav = favs.some(f => f.toolId === Number(req.params.toolId));
  res.json({ isFavourite: isFav });
});

module.exports = router;
