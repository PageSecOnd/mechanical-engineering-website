import mongoose, { Schema, Document } from 'mongoose';

export interface ArticleDocument extends Document {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

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