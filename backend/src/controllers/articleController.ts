import { Request, Response } from 'express';
import { Article } from '../models/Article';
import { createPagination } from '../utils/helpers';
import { AuthRequest } from '../middleware/auth';

export const getArticles = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string;
    const search = req.query.search as string;
    const published = req.query.published !== 'false'; // Default to true for public

    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    if (published) query.published = true;
    if (category) query.category = category;
    if (search) {
      query.$text = { $search: search };
    }

    const [articles, total] = await Promise.all([
      Article.find(query)
        .sort(search ? { score: { $meta: 'textScore' } } : { publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Article.countDocuments(query)
    ]);

    const pagination = createPagination(page, limit, total);

    res.json({
      success: true,
      data: {
        items: articles,
        pagination
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found'
      });
    }

    res.json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const createArticle = async (req: AuthRequest, res: Response) => {
  try {
    const articleData = { ...req.body };
    
    if (articleData.published && !articleData.publishedAt) {
      articleData.publishedAt = new Date();
    }

    const article = new Article(articleData);
    await article.save();

    res.status(201).json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateArticle = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Handle publishing
    if (updateData.published && !updateData.publishedAt) {
      updateData.publishedAt = new Date();
    } else if (!updateData.published) {
      updateData.publishedAt = null;
    }

    const article = await Article.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found'
      });
    }

    res.json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const deleteArticle = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndDelete(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found'
      });
    }

    res.json({
      success: true,
      message: 'Article deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getLatestArticles = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    
    const articles = await Article.find({ published: true })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .select('title excerpt author category featuredImage publishedAt');

    res.json({
      success: true,
      data: articles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};