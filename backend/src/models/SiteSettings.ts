import mongoose, { Schema, Document } from 'mongoose';

export interface SiteSettingsDocument extends Document {
  companyName: string;
  companyDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  carouselImages: {
    image: string;
    title: string;
    description: string;
    link?: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const CarouselImageSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String }
}, { _id: false });

const SocialLinkSchema = new Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true }
}, { _id: false });

const SiteSettingsSchema = new Schema<SiteSettingsDocument>({
  companyName: {
    type: String,
    required: true,
    default: '机械工程有限公司'
  },
  companyDescription: {
    type: String,
    required: true,
    default: '专业的机械工程服务提供商'
  },
  contactEmail: {
    type: String,
    required: true,
    default: 'contact@example.com'
  },
  contactPhone: {
    type: String,
    required: true,
    default: '+86 123 4567 8900'
  },
  contactAddress: {
    type: String,
    required: true,
    default: '北京市朝阳区'
  },
  seoTitle: {
    type: String,
    required: true,
    default: '机械工程有限公司 - 专业机械工程服务'
  },
  seoDescription: {
    type: String,
    required: true,
    default: '专业的机械工程服务提供商，提供优质的产品和解决方案'
  },
  seoKeywords: [{
    type: String
  }],
  carouselImages: [CarouselImageSchema],
  socialLinks: [SocialLinkSchema]
}, {
  timestamps: true
});

export const SiteSettings = mongoose.model<SiteSettingsDocument>('SiteSettings', SiteSettingsSchema);