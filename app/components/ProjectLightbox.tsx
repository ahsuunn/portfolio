'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  projectName: string;
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export default function ProjectLightbox({
  projectName,
  images,
  initialIndex = 0,
  onClose,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  if (!images || images.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${projectName} preview`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 transition-opacity"
      />

      {/* Lightbox Container */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center">
        {/* Header Bar */}
        <div className="w-full flex items-center justify-between py-3 px-2 text-white/90 text-sm">
          <div className="flex items-center gap-3 truncate">
            <span className="font-medium truncate">{projectName}</span>
            {images.length > 1 && (
              <span className="text-xs text-white/60 tabular-nums font-normal">
                {currentIndex + 1} / {images.length}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="p-1.5 rounded-md hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Main Image View */}
        <div className="relative w-full aspect-video max-h-[75vh] flex items-center justify-center rounded-lg overflow-hidden border border-white/15 bg-black/60">
          <Image
            src={images[currentIndex]}
            alt={`${projectName} screenshot ${currentIndex + 1}`}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
            priority
          />

          {/* Prev / Next Buttons */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/15 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/15 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Selector Strip (if > 1 image) */}
        {images.length > 1 && (
          <div className="flex items-center gap-2 mt-3 overflow-x-auto max-w-full py-1 px-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`View image ${idx + 1}`}
                className={`relative w-16 h-10 rounded border overflow-hidden transition-all ${
                  currentIndex === idx
                    ? 'border-white opacity-100 scale-105'
                    : 'border-white/20 opacity-50 hover:opacity-80'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
