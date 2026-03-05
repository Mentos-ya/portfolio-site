'use client'

import { useState, useEffect } from 'react'

export default function AddCaseBlock() {
  const [modalOpen, setModalOpen] = useState(false)
  const [chestImgError, setChestImgError] = useState(false)
  const [chestKey, setChestKey] = useState(0)

  useEffect(() => {
    if (modalOpen) {
      setChestImgError(false)
      setChestKey((k) => k + 1)
    }
  }, [modalOpen])

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="group relative w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center py-8 mt-6 mb-6 bg-white transition-[border-color,box-shadow] duration-300 hover:border-sky-400 hover:ring-1 hover:ring-sky-400/50 cursor-pointer text-left"
      >
        {/* При наведении: тёмный фон как у карточек + одна диагональная полоска с градиентом */}
        <div
          className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none bg-black/60"
          aria-hidden
        />
        <div
          className="absolute inset-0 rounded-lg overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
          aria-hidden
        >
          {Array.from({ length: 25 }, (_, i) => (i - 12) * 60).map((offset) => (
            <div
              key={offset}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '200%',
                height: '8px',
                transform: `translate(calc(-50% + ${offset}px), -50%) rotate(45deg)`,
                background: 'linear-gradient(to right, #ec4899, #a855f7, #6366f1)',
                borderRadius: '4px',
              }}
            />
          ))}
        </div>
        <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-400 text-gray-500 group-hover:text-white group-hover:border-white/80 transition-colors duration-300 text-2xl font-light min-w-[3rem] min-h-[3rem]" style={{ lineHeight: 1 }}>
          <span className="inline-flex items-center justify-center w-full h-full" style={{ paddingBottom: '0.08em' }}>+</span>
        </span>
      </button>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
          <div className="absolute inset-0 z-0 bg-black/85" onClick={() => setModalOpen(false)} aria-hidden />
          <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center mb-0 min-h-[24rem] items-center">
              {chestImgError ? (
                <span className="text-5xl" aria-hidden>📦</span>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={chestKey}
                  src={`/images/chest-open.gif?t=${chestKey}`}
                  alt="Сундук открывается"
                  className="w-[36rem] max-w-full h-auto object-contain"
                  onError={() => setChestImgError(true)}
                />
              )}
            </div>
            <p className="font-pixel text-2xl font-normal text-white leading-snug text-center -mt-20 md:-mt-32 text-[1.05em]">
              Ура, это мэтч!<br />
              Напишите мне в Telegram,<br />
              готов подробно обсудить детали<br />
              вашего предложения о работе.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
