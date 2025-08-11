'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { PhotoIcon, XMarkIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

interface ImageUploadProps {
  label?: string;
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  error?: string;
}

export function ImageUpload({
  label,
  images,
  onChange,
  maxImages = 5,
  error,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (files: FileList) => {
    if (images.length + files.length > maxImages) {
      toast.error(`最多只能上传 ${maxImages} 张图片`);
      return;
    }

    setUploading(true);
    const uploadPromises: Promise<string>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} 不是有效的图片文件`);
        continue;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} 文件大小超过 5MB`);
        continue;
      }

      const formData = new FormData();
      formData.append('file', file);

      uploadPromises.push(
        api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(response => response.data.data.url)
      );
    }

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      onChange([...images, ...uploadedUrls]);
      toast.success(`成功上传 ${uploadedUrls.length} 张图片`);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('图片上传失败');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onChange(newImages);
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg">
        <label className="cursor-pointer block">
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                handleFileUpload(e.target.files);
              }
            }}
            disabled={uploading || images.length >= maxImages}
          />
          <div className="p-6 text-center">
            {uploading ? (
              <div className="flex flex-col items-center">
                <CloudArrowUpIcon className="h-12 w-12 text-gray-400 animate-pulse" />
                <p className="mt-2 text-sm text-gray-600">上传中...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <PhotoIcon className="h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  {images.length >= maxImages
                    ? `已达到最大数量 (${maxImages})`
                    : '点击或拖拽文件到此处上传图片'
                  }
                </p>
                <p className="text-xs text-gray-500">
                  支持 JPG, PNG, GIF 格式，单文件最大 5MB
                </p>
              </div>
            )}
          </div>
        </label>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className="group relative">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg border-2 border-gray-200">
                <img
                  src={image}
                  alt={`预览图 ${index + 1}`}
                  className="h-32 w-full object-cover"
                />
              </div>
              
              {/* Controls */}
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="rounded-full bg-red-600 p-1 text-white hover:bg-red-700"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Position indicator */}
              <div className="absolute bottom-2 left-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black bg-opacity-75 text-white">
                  {index + 1}
                  {index === 0 && ' (封面)'}
                </span>
              </div>

              {/* Move buttons */}
              <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {index > 0 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => moveImage(index, index - 1)}
                    className="h-6 w-6 p-0 bg-black bg-opacity-75 text-white hover:bg-opacity-90"
                  >
                    ←
                  </Button>
                )}
                {index < images.length - 1 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => moveImage(index, index + 1)}
                    className="h-6 w-6 p-0 bg-black bg-opacity-75 text-white hover:bg-opacity-90"
                  >
                    →
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {images.length > 0 && (
        <p className="text-xs text-gray-500">
          第一张图片将作为封面图显示。点击左右箭头可调整图片顺序。
        </p>
      )}
    </div>
  );
}