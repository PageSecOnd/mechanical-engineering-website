import { Router } from 'express';
import { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getFeaturedProducts 
} from '../controllers/productController';
import { auth } from '../middleware/auth';
import { validate, productSchema } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProduct);

// Protected routes
router.post('/', auth, validate(productSchema), createProduct);
router.put('/:id', auth, validate(productSchema), updateProduct);
router.delete('/:id', auth, deleteProduct);

export default router;