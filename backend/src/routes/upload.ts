import { Router } from 'express';
import { upload } from '../utils/upload';
import { auth } from '../middleware/auth';

const router = Router();

// Single file upload
router.post('/single', auth, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    res.json({
      success: true,
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: `/uploads/${req.file.filename}`,
        size: req.file.size
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Upload failed'
    });
  }
});

// Multiple files upload
router.post('/multiple', auth, upload.array('files', 5), (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files uploaded'
      });
    }

    const uploadedFiles = files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      path: `/uploads/${file.filename}`,
      size: file.size
    }));

    res.json({
      success: true,
      data: uploadedFiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Upload failed'
    });
  }
});

export default router;