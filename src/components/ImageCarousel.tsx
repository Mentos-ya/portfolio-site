'use client'

import { useState, useEffect } from 'react'

type Slide = { src: string; alt: string }

export default function ImageCarousel({ slides, maxWidth: maxWidthProp }: { slides: Slide[]; maxWidth?: number }) {
  const [current, setCurrent] = useState(0)
  const [imgError, setImgError] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const mdMaxWidthClass = maxWidthProp === 300 ? 'md:max-w-[300px]' : 'md:max-w-[265px]'

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
    <div className={`w-full max-w-full ${mdMaxWidthClass} flex flex-col shrink-0 mx-auto md:mx-0`}>
      <div style={{
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        border: '1px solid #2a2a3a',
        borderBottom: 'none',
        overflow: 'hidden',
        background: '#12121c',
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
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#71717a', fontSize: 14, padding: 16, textAlign: 'center' }}>
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
          border: '1px solid #2a2a3a',
          borderTop: 'none',
          background: '#12121c',
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
              background: '#2e2e44',
              color: '#e4e4e7',
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
                  background: i === current ? '#f5f5f7' : '#2e2e44',
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
              background: '#2e2e44',
              color: '#e4e4e7',
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
