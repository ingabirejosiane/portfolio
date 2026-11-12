import { Router } from 'express';
import { pool } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [
      req.params.id,
    ]);
    if (!rows.length) return res.status(404).json({ error: 'Project not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const {
      title,
      description = '',
      image_url = '',
      tech_stack = '',
      live_url = '',
      repo_url = '',
      featured = 0,
      sort_order = 0,
    } = req.body || {};
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const [result] = await pool.query(
      `INSERT INTO projects
       (title, description, image_url, tech_stack, live_url, repo_url, featured, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        image_url,
        tech_stack,
        live_url,
        repo_url,
        featured ? 1 : 0,
        Number(sort_order) || 0,
      ]
    );
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const {
      title,
      description = '',
      image_url = '',
      tech_stack = '',
      live_url = '',
      repo_url = '',
      featured = 0,
      sort_order = 0,
    } = req.body || {};
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const [result] = await pool.query(
      `UPDATE projects SET
        title = ?, description = ?, image_url = ?, tech_stack = ?,
        live_url = ?, repo_url = ?, featured = ?, sort_order = ?
       WHERE id = ?`,
      [
        title,
        description,
        image_url,
        tech_stack,
        live_url,
        repo_url,
        featured ? 1 : 0,
        Number(sort_order) || 0,
        req.params.id,
      ]
    );
    if (!result.affectedRows) return res.status(404).json({ error: 'Project not found' });

    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [
      req.params.id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [
      req.params.id,
    ]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Project not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
