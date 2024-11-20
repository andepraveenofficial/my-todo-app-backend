import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import todoRoutes from './todo.route';
import authMiddleware from '../../../middlewares/auth.middleware';
import roleMiddleware from '../../../middlewares/role.middleware';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', authMiddleware, roleMiddleware(['ADMIN']), userRoutes);
router.use(
  '/todos',
  authMiddleware,
  roleMiddleware(['ADMIN', 'USER']),
  todoRoutes,
);

export default router;
