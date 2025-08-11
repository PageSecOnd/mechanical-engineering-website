import { Request, Response } from 'express';
import { SiteSettings } from '../models/SiteSettings';
import { AuthRequest } from '../middleware/auth';

export const getSiteSettings = async (req: Request, res: Response) => {
  try {
    let settings = await SiteSettings.findOne();
    
    if (!settings) {
      // Create default settings if none exist
      settings = new SiteSettings({});
      await settings.save();
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateSiteSettings = async (req: AuthRequest, res: Response) => {
  try {
    let settings = await SiteSettings.findOne();
    
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    
    await settings.save();

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const uploadCarouselImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      success: true,
      data: { imageUrl }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const handleContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

    // Here you would typically send an email or save to database
    // For now, we'll just log it and return success
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      company,
      subject,
      message,
      timestamp: new Date()
    });

    res.json({
      success: true,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};