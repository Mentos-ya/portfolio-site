'use client'

import { useState, useEffect } from 'react'

type Slide = { src: string; alt: string }

export default function ImageCarousel({ slides, maxWidth: maxWidthProp }: { slides: Slide[]; maxWidth?: number }) {
  const [current, setCurrent] = useState(0)
  const [imgError, setImgError] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const maxWidth = maxWidthProp ?? 265

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false)
      if (slides.length <= 1) return
      if (e.key === 'ArrowLeft') setCurrent(prev => prev === 0 ? slides.length - 1 : prev - 1)
      if (e.key === 'ArrowRight') setCurrent(prev => prev === slides.length - 1 ? 0 : prev + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen, slides.length])

  if (!slides.length) return null

  return (
    <div style={{ width: '100%', maxWidth, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        border: '2px solid #e5e7eb',
        borderBottom: 'none',
        overflow: 'hidden',
        background: '#f3f4f6',
      }}>
        <div
          style={{ aspectRatio: '4/3', width: '100%', cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onClick={() => !imgError && setModalOpen(true)}
          onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !imgError) { e.preventDefault(); setModalOpen(true) } }}
          aria-label="Открыть в полном размере"
        >
          {!imgError ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={slides[current].src}
              alt={slides[current].alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
              draggable={false}
              onError={() => setImgError(true)}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 14, padding: 16, textAlign: 'center' }}>
              Изображение не найдено
            </div>
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          padding: '12px 8px',
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          border: '2px solid #e5e7eb',
          borderTop: 'none',
          background: '#f9fafb',
        }}>
          <button
            type="button"
            onClick={() => {
              setImgError(false)
              setCurrent(prev => prev === 0 ? slides.length - 1 : prev - 1)
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              background: '#d1d5db',
              color: '#374151',
              fontSize: 20,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Предыдущее"
          >
            ‹
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: i === current ? '#1f2937' : '#d1d5db',
                }}
                aria-label={`Слайд ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setImgError(false)
              setCurrent(prev => prev === slides.length - 1 ? 0 : prev + 1)
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              background: '#d1d5db',
              color: '#374151',
              fontSize: 20,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Следующее"
          >
            ›
          </button>
        </div>
      )}

      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.8)',
            padding: 24,
          }}
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Изображение в полном размере"
        >
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: 24,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}
            aria-label="Закрыть"
          >
            ×
          </button>

          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setCurrent(prev => prev === 0 ? slides.length - 1 : prev - 1) }}
                style={{
                  position: 'absolute',
                  left: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontSize: 28,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                }}
                aria-label="Предыдущее изображение"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setCurrent(prev => prev === slides.length - 1 ? 0 : prev + 1) }}
                style={{
                  position: 'absolute',
                  right: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontSize: 28,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                }}
                aria-label="Следующее изображение"
              >
                ›
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slides[current].src}
            alt={slides[current].alt}
            style={{ maxWidth: '100%', maxHeight: '90vh', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: 8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
