import { Router } from 'express';
import { 
  getCategories, 
  getCategory, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../controllers/categoryController';
import { auth } from '../middleware/auth';
import { validate, categorySchema } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategory);

// Protected routes
router.post('/', auth, validate(categorySchema), createCategory);
router.put('/:id', auth, validate(categorySchema), updateCategory);
router.delete('/:id', auth, deleteCategory);

export default router;