import { Router } from 'express';
import { signToken } from '../middleware/auth.js';

const router = Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (username !== adminUser || password !== adminPass) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = signToken({ username: adminUser, role: 'admin' });
  res.json({ token, user: { username: adminUser } });
});

export default router;
