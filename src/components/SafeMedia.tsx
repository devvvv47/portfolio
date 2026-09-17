import React, { useEffect, useState } from 'react';
import { getMediaFile, isIdbUrl, extractIdbKey } from '../utils/indexedDBMedia';

interface SafeMediaProps {
  url?: string;
  alt?: string;
  className?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export const SafeMedia: React.FC<SafeMediaProps> = ({
  url,
  alt = '',
  className = '',
  controls = true,
  autoPlay = false,
  loop = false,
  muted = true,
  playsInline = true,
}) => {
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');

  useEffect(() => {
    let active = true;
    let objectUrlToRevoke: string | null = null;

    if (!url) {
      setResolvedUrl(null);
      return;
    }

    if (isIdbUrl(url)) {
      const key = extractIdbKey(url);
      getMediaFile(key)
        .then((blob) => {
          if (!active) return;
          if (blob) {
            objectUrlToRevoke = URL.createObjectURL(blob);
            setResolvedUrl(objectUrlToRevoke);
            setMimeType(blob.type);
          } else {
            setResolvedUrl(null);
          }
        })
        .catch(() => {
          if (active) setResolvedUrl(null);
        });
    } else {
      setResolvedUrl(url);
      setMimeType('');
    }

    return () => {
      active = false;
      if (objectUrlToRevoke) {
        URL.revokeObjectURL(objectUrlToRevoke);
      }
    };
  }, [url]);

  if (!resolvedUrl) {
    return (
      <div className={`bg-neutral-200 flex items-center justify-center text-neutral-400 font-mono text-xs ${className}`}>
        No Media
      </div>
    );
  }

  // Check if it's a video based on mimeType, extension, or data URL
  const isVideo =
    mimeType.startsWith('video/') ||
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(resolvedUrl) ||
    resolvedUrl.startsWith('data:video/');

  if (isVideo) {
    return (
      <video
        src={resolvedUrl}
        className={className}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
      />
    );
  }

  return (
    <img
      src={resolvedUrl}
      alt={alt}
      referrerPolicy="no-referrer"
      className={className}
    />
  );
};
