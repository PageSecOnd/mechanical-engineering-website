import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }
    
    next();
  };
};

// Validation schemas
export const loginSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(6).required()
});

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const articleSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  excerpt: Joi.string().max(300).required(),
  author: Joi.string().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  featuredImage: Joi.string().allow(''),
  published: Joi.boolean()
});

export const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  images: Joi.array().items(Joi.string()),
  specifications: Joi.object(),
  featured: Joi.boolean(),
  order: Joi.number()
});

export const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  type: Joi.string().valid('article', 'product').required(),
  order: Joi.number()
});

export const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow(''),
  company: Joi.string().allow(''),
  subject: Joi.string().required(),
  message: Joi.string().required()
});