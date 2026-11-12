import { Router } from 'express';
import { pool } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM profile WHERE id = 1');
    res.json(rows[0] || null);
  } catch (err) {
    next(err);
  }
});

router.put('/', requireAuth, async (req, res, next) => {
  try {
    const fields = [
      'name',
      'title',
      'bio',
      'email',
      'phone',
      'location',
      'github',
      'linkedin',
      'twitter',
      'website',
      'resume_url',
      'avatar_url',
    ];

    const values = fields.map((f) => req.body[f] ?? null);
    const assignments = fields.map((f) => `${f} = ?`).join(', ');

    await pool.query(
      `INSERT INTO profile (id, ${fields.join(', ')})
       VALUES (1, ${fields.map(() => '?').join(', ')})
       ON DUPLICATE KEY UPDATE ${assignments}`,
      [...values, ...values]
    );

    const [rows] = await pool.query('SELECT * FROM profile WHERE id = 1');
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
