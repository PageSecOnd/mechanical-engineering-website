import { Router } from 'express';
import { 
  getSiteSettings, 
  updateSiteSettings, 
  uploadCarouselImage,
  handleContactForm 
} from '../controllers/siteController';
import { auth, adminAuth } from '../middleware/auth';
import { validate, contactSchema } from '../middleware/validation';
import { upload } from '../utils/upload';

const router = Router();

// Public routes
router.get('/settings', getSiteSettings);
router.post('/contact', validate(contactSchema), handleContactForm);

// Protected routes
router.put('/settings', auth, adminAuth, updateSiteSettings);
router.post('/upload/carousel', auth, adminAuth, upload.single('image'), uploadCarouselImage);

export default router;