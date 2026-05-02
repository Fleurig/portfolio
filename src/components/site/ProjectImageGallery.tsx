'use client';

import { useState, useEffect, useCallback, useRef, useId } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

export type GalleryImage = {
  src: string;
  alt: string;
};

/** Delay (ms) before moving focus into the lightbox, letting the opening animation start first. */
const FOCUS_DELAY_MS = 50;

function LightboxPortal({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const image = images[index];
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  // Focus the close button when the lightbox opens
  useEffect(() => {
    const id: ReturnType<typeof setTimeout> = setTimeout(
      () => closeRef.current?.focus(),
      FOCUS_DELAY_MS,
    );
    return () => clearTimeout(id);
  }, []);

  // Keyboard handling
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev();
        return;
      }
      if (e.key === 'ArrowRight' && hasNext) {
        onNext();
        return;
      }
      // Focus trap
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="btn btn-surface absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full p-0"
      >
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M1 1l12 12M13 1L1 13" />
        </svg>
      </button>

      {/* Prev button */}
      {hasPrev ? (
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous image"
          className="btn btn-surface absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full p-0"
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 4L6 8l4 4" />
          </svg>
        </button>
      ) : null}

      {/* Next button */}
      {hasNext ? (
        <button
          type="button"
          onClick={onNext}
          aria-label="Next image"
          className="btn btn-surface absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full p-0"
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 4l4 4-4 4" />
          </svg>
        </button>
      ) : null}

      {/* Image container */}
      <div className="relative z-10 mx-auto flex max-h-[90vh] max-w-[90vw] flex-col items-center gap-3 px-16">
        <div className="relative overflow-hidden rounded-xl shadow-glass">
          <Image
            src={image.src}
            alt={image.alt}
            width={1200}
            height={800}
            className="max-h-[80vh] w-auto object-contain"
            priority
          />
        </div>
        {/* Caption */}
        <p id={titleId} className="max-w-lg text-center text-sm text-white/80">
          {image.alt}
        </p>
        {/* Counter */}
        {images.length > 1 ? (
          <p className="text-xs text-white/60">
            {index + 1} / {images.length}
          </p>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}

export function ProjectImageGallery({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    [],
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : i)),
    [images.length],
  );

  if (!images.length) return null;

  const isSingle = images.length === 1;

  return (
    <div className="not-prose mt-8">
      {/* Grid */}
      <div
        className={
          isSingle
            ? 'grid grid-cols-1'
            : 'grid grid-cols-2 gap-3 sm:grid-cols-3'
        }
      >
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => openLightbox(i)}
            aria-label={`View image: ${img.alt} (${i + 1} of ${images.length})`}
            className="gallery-tile group"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-surface-muted">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 768px) 33vw, 50vw"
              />
              {/* Hover overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/20"
              />
              {/* Zoom icon */}
              <div
                aria-hidden="true"
                className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="6" cy="6" r="4" />
                  <path d="M9 9l4 4" />
                  <path d="M4 6h4M6 4v4" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null ? (
        <LightboxPortal
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      ) : null}
    </div>
  );
}
