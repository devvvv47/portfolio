import React, { useRef, useState } from 'react';
import { Upload, X, Film, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { saveMediaFile } from '../utils/indexedDBMedia';

interface MediaUploaderProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  helperText?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  label,
  value = '',
  onChange,
  accept = 'image/*,video/*',
  helperText = '내 컴퓨터 파일 선택 (사진/동영상) 또는 웹 URL 입력',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(!value || !value.startsWith('idb://'));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const uniqueKey = `media_${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const idbUrl = await saveMediaFile(uniqueKey, file);
      onChange(idbUrl);
    } catch (err) {
      console.error('Failed to store media file in IndexedDB:', err);
      alert('파일 업로드 처리 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  const isLocalIdb = value.startsWith('idb://');

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono font-bold text-neutral-800">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] font-mono text-neutral-500 hover:text-[#7C3AED] flex items-center gap-1"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? 'URL 입력 닫기' : '직접 URL 입력'}</span>
          </button>
        </div>
      </div>

      {/* Main Upload / Select Control */}
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1.5 bg-[#7C3AED] hover:bg-violet-700 text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>{isUploading ? '업로드 중...' : '내 컴퓨터에서 파일 선택'}</span>
        </button>

        {value && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-100 border border-black/10 text-xs font-mono text-neutral-700 max-w-[280px]">
            {value.includes('video') || value.endsWith('.mp4') || value.endsWith('.webm') ? (
              <Film className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
            ) : (
              <ImageIcon className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
            )}
            <span className="truncate" title={value}>
              {isLocalIdb ? '내 컴퓨터 파일 등록됨' : value}
            </span>
            <button
              type="button"
              onClick={handleRemove}
              className="text-neutral-400 hover:text-red-600 p-0.5"
              title="삭제"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Manual URL input option */}
      {showUrlInput && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... 이미지 또는 영상 URL"
          className="w-full px-3 py-1.5 border border-black/20 text-xs font-mono text-neutral-800 focus:border-[#7C3AED] focus:outline-hidden"
        />
      )}

      {helperText && (
        <p className="text-[11px] font-mono text-neutral-400">
          * {helperText}
        </p>
      )}
    </div>
  );
};
