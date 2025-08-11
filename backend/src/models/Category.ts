import mongoose, { Schema, Document } from 'mongoose';

export interface CategoryDocument extends Document {
  name: string;
  description?: string;
  type: 'article' | 'product';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<CategoryDocument>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['article', 'product'],
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

CategorySchema.index({ type: 1, order: 1 });

export const Category = mongoose.model<CategoryDocument>('Category', CategorySchema);