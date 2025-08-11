import { Router } from 'express';
import { 
  getArticles, 
  getArticle, 
  createArticle, 
  updateArticle, 
  deleteArticle,
  getLatestArticles 
} from '../controllers/articleController';
import { auth } from '../middleware/auth';
import { validate, articleSchema } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/', getArticles);
router.get('/latest', getLatestArticles);
router.get('/:id', getArticle);

// Protected routes
router.post('/', auth, validate(articleSchema), createArticle);
router.put('/:id', auth, validate(articleSchema), updateArticle);
router.delete('/:id', auth, deleteArticle);

export default router;