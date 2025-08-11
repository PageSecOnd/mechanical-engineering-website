'use client';

import React from 'react';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  rows?: number;
}

export function MarkdownEditor({
  value,
  onChange,
  label,
  error,
  placeholder,
  rows = 10,
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  return (
    <div className="space-y-3">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <div className="flex space-x-1">
            <Button
              type="button"
              variant={mode === 'edit' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setMode('edit')}
            >
              <PencilIcon className="w-4 h-4 mr-1" />
              编辑
            </Button>
            <Button
              type="button"
              variant={mode === 'preview' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setMode('preview')}
            >
              <EyeIcon className="w-4 h-4 mr-1" />
              预览
            </Button>
          </div>
        </div>
      )}

      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {mode === 'edit' ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="border-0 resize-none focus:ring-0"
            error={undefined}
          />
        ) : (
          <div className="p-4 min-h-[250px] bg-white">
            {value ? (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {value}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-gray-500 italic">
                没有内容可预览，请在编辑模式下添加内容
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {mode === 'edit' && (
        <div className="text-xs text-gray-500">
          支持Markdown语法，包括标题、列表、链接、图片等。
        </div>
      )}
    </div>
  );
}