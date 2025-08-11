'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Loading } from '@/components/ui/Loading';
import api from '@/lib/api';
import { SiteSettings } from '@/shared/types';
import toast from 'react-hot-toast';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  PlusIcon,
  TrashIcon,
  PhotoIcon,
  LinkIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const settingsSchema = z.object({
  companyName: z.string().min(1, '公司名称不能为空'),
  companyDescription: z.string().min(1, '公司描述不能为空'),
  contactEmail: z.string().email('请输入有效的邮箱地址'),
  contactPhone: z.string().min(1, '联系电话不能为空'),
  contactAddress: z.string().min(1, '联系地址不能为空'),
  seoTitle: z.string().min(1, 'SEO标题不能为空'),
  seoDescription: z.string().min(1, 'SEO描述不能为空'),
  seoKeywords: z.array(z.string()).optional(),
  carouselImages: z.array(z.object({
    image: z.string().min(1, '图片URL不能为空'),
    title: z.string().min(1, '图片标题不能为空'),
    description: z.string().min(1, '图片描述不能为空'),
    link: z.string().optional(),
  })),
  socialLinks: z.array(z.object({
    platform: z.string().min(1, '平台名称不能为空'),
    url: z.string().url('请输入有效的URL'),
  })),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'basic' | 'seo' | 'carousel' | 'social'>('basic');

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      carouselImages: [],
      socialLinks: [],
      seoKeywords: [],
    },
  });

  const {
    fields: carouselFields,
    append: appendCarousel,
    remove: removeCarousel,
  } = useFieldArray({
    control,
    name: 'carouselImages',
  });

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: 'socialLinks',
  });

  const seoKeywords = watch('seoKeywords') || [];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/site/settings');
      const settings = response.data.data;
      
      // Reset form with fetched data
      reset({
        companyName: settings.companyName || '',
        companyDescription: settings.companyDescription || '',
        contactEmail: settings.contactEmail || '',
        contactPhone: settings.contactPhone || '',
        contactAddress: settings.contactAddress || '',
        seoTitle: settings.seoTitle || '',
        seoDescription: settings.seoDescription || '',
        seoKeywords: settings.seoKeywords || [],
        carouselImages: settings.carouselImages || [],
        socialLinks: settings.socialLinks || [],
      });
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      toast.error('获取网站设置失败');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: SettingsFormData) => {
    try {
      await api.put('/site/settings', data);
      toast.success('网站设置更新成功');
    } catch (error) {
      console.error('Failed to update settings:', error);
      toast.error('更新网站设置失败');
    }
  };

  const addKeyword = (keyword: string) => {
    if (keyword.trim() && !seoKeywords.includes(keyword.trim())) {
      setValue('seoKeywords', [...seoKeywords, keyword.trim()]);
    }
  };

  const removeKeyword = (index: number) => {
    setValue('seoKeywords', seoKeywords.filter((_, i) => i !== index));
  };

  const tabs = [
    { id: 'basic', name: '基本信息', icon: BuildingOfficeIcon },
    { id: 'seo', name: 'SEO设置', icon: GlobeAltIcon },
    { id: 'carousel', name: '轮播图', icon: PhotoIcon },
    { id: 'social', name: '社交链接', icon: LinkIcon },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-12">
          <Loading />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">网站设置</h1>
          <p className="mt-1 text-sm text-gray-500">
            管理网站的基本信息和配置
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Tabs */}
          <div className="bg-white shadow rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                  >
                    <tab.icon className="w-5 h-5 mr-2" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="px-6 py-6">
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Input
                      {...register('companyName')}
                      label="公司名称"
                      placeholder="请输入公司名称"
                      error={errors.companyName?.message}
                    />
                    <Input
                      {...register('contactEmail')}
                      label="联系邮箱"
                      type="email"
                      placeholder="请输入联系邮箱"
                      error={errors.contactEmail?.message}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Input
                      {...register('contactPhone')}
                      label="联系电话"
                      placeholder="请输入联系电话"
                      error={errors.contactPhone?.message}
                    />
                    <Input
                      {...register('contactAddress')}
                      label="联系地址"
                      placeholder="请输入联系地址"
                      error={errors.contactAddress?.message}
                    />
                  </div>
                  <Textarea
                    {...register('companyDescription')}
                    label="公司描述"
                    placeholder="请输入公司描述"
                    rows={4}
                    error={errors.companyDescription?.message}
                  />
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <Input
                    {...register('seoTitle')}
                    label="SEO标题"
                    placeholder="请输入网站SEO标题"
                    error={errors.seoTitle?.message}
                  />
                  <Textarea
                    {...register('seoDescription')}
                    label="SEO描述"
                    placeholder="请输入网站SEO描述"
                    rows={3}
                    error={errors.seoDescription?.message}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO关键词
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Input
                          placeholder="输入关键词后按回车添加"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addKeyword((e.target as HTMLInputElement).value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {seoKeywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                          >
                            {keyword}
                            <button
                              type="button"
                              onClick={() => removeKeyword(index)}
                              className="ml-2 text-indigo-600 hover:text-indigo-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Carousel Tab */}
              {activeTab === 'carousel' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">轮播图管理</h3>
                    <Button
                      type="button"
                      onClick={() =>
                        appendCarousel({
                          image: '',
                          title: '',
                          description: '',
                          link: '',
                        })
                      }
                    >
                      <PlusIcon className="w-5 h-5 mr-2" />
                      添加轮播图
                    </Button>
                  </div>
                  <div className="space-y-6">
                    {carouselFields.map((field, index) => (
                      <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-md font-medium text-gray-900">
                            轮播图 {index + 1}
                          </h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCarousel(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Input
                            {...register(`carouselImages.${index}.image`)}
                            label="图片URL"
                            placeholder="请输入图片URL"
                            error={errors.carouselImages?.[index]?.image?.message}
                          />
                          <Input
                            {...register(`carouselImages.${index}.title`)}
                            label="标题"
                            placeholder="请输入标题"
                            error={errors.carouselImages?.[index]?.title?.message}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
                          <Textarea
                            {...register(`carouselImages.${index}.description`)}
                            label="描述"
                            placeholder="请输入描述"
                            rows={2}
                            error={errors.carouselImages?.[index]?.description?.message}
                          />
                          <Input
                            {...register(`carouselImages.${index}.link`)}
                            label="链接（可选）"
                            placeholder="请输入链接"
                            error={errors.carouselImages?.[index]?.link?.message}
                          />
                        </div>
                      </div>
                    ))}
                    {carouselFields.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        还没有轮播图，点击上方按钮添加第一张轮播图
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Social Links Tab */}
              {activeTab === 'social' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">社交链接管理</h3>
                    <Button
                      type="button"
                      onClick={() =>
                        appendSocial({
                          platform: '',
                          url: '',
                        })
                      }
                    >
                      <PlusIcon className="w-5 h-5 mr-2" />
                      添加社交链接
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {socialFields.map((field, index) => (
                      <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-md font-medium text-gray-900">
                            社交链接 {index + 1}
                          </h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSocial(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Input
                            {...register(`socialLinks.${index}.platform`)}
                            label="平台名称"
                            placeholder="如：微信、微博、QQ等"
                            error={errors.socialLinks?.[index]?.platform?.message}
                          />
                          <Input
                            {...register(`socialLinks.${index}.url`)}
                            label="链接URL"
                            placeholder="请输入完整的URL"
                            error={errors.socialLinks?.[index]?.url?.message}
                          />
                        </div>
                      </div>
                    ))}
                    {socialFields.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        还没有社交链接，点击上方按钮添加第一个社交链接
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex justify-end">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  保存设置
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}