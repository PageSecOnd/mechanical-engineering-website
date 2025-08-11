import { Router } from 'express';
import { register, login, getProfile, getUsers, deleteUser } from '../controllers/authController';
import { auth, adminAuth } from '../middleware/auth';
import { validate, loginSchema, registerSchema } from '../middleware/validation';

const router = Router();

// Public routes
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Protected routes
router.get('/profile', auth, getProfile);
router.get('/users', auth, adminAuth, getUsers);
router.delete('/users/:id', auth, adminAuth, deleteUser);

export default router;