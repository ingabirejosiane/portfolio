import { Router } from 'express';
import { pool } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM skills ORDER BY category ASC, level DESC, name ASC'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { name, category = 'General', level = 80 } = req.body || {};
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const [result] = await pool.query(
      'INSERT INTO skills (name, category, level) VALUES (?, ?, ?)',
      [name, category, Math.max(0, Math.min(100, Number(level)))]
    );
    const [rows] = await pool.query('SELECT * FROM skills WHERE id = ?', [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { name, category = 'General', level = 80 } = req.body || {};
    const [result] = await pool.query(
      'UPDATE skills SET name = ?, category = ?, level = ? WHERE id = ?',
      [name, category, Math.max(0, Math.min(100, Number(level))), req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ error: 'Skill not found' });

    const [rows] = await pool.query('SELECT * FROM skills WHERE id = ?', [
      req.params.id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM skills WHERE id = ?', [
      req.params.id,
    ]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Skill not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
