import { Router } from 'express';
import { pool } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Public: submit a contact message
router.post('/', async (req, res, next) => {
  try {
    const { name, email, subject = '', message } = req.body || {};

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: 'Name, email and message are required' });
    }
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email' });
    }

    const [result] = await pool.query(
      'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );

    res.status(201).json({
      success: true,
      id: result.insertId,
      message: 'Message sent successfully',
    });
  } catch (err) {
    next(err);
  }
});

// Admin: list messages
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM messages ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// Admin: toggle read status
router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const isRead = req.body?.is_read ? 1 : 0;
    const [result] = await pool.query(
      'UPDATE messages SET is_read = ? WHERE id = ?',
      [isRead, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ error: 'Message not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM messages WHERE id = ?', [
      req.params.id,
    ]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Message not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
