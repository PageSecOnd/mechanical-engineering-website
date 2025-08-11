import mongoose, { Schema, Document } from 'mongoose';
import { Article as IArticle } from '../../../shared/types';

export interface ArticleDocument extends Omit<IArticle, '_id'>, Document {}

const ArticleSchema = new Schema<ArticleDocument>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  featuredImage: {
    type: String
  },
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for search and filtering
ArticleSchema.index({ title: 'text', content: 'text', excerpt: 'text' });
ArticleSchema.index({ category: 1, published: 1 });
ArticleSchema.index({ published: 1, publishedAt: -1 });

export const Article = mongoose.model<ArticleDocument>('Article', ArticleSchema);