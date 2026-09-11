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
      {/* Пасхалка для рекрутеров. При наведении рамка заливается тёмно-синим, «+» прячется,
          вместо него строка командной строки с мигающим курсором. На телефоне наведения нет — там остаётся «+» */}
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        aria-label="Здесь может быть ваша компания"
        className="group relative w-full border-2 border-dashed border-ink/25 rounded-none flex items-center justify-center py-8 mt-5 mb-6 bg-transparent transition-colors duration-150 motion-reduce:transition-none md:hover:bg-ink md:hover:border-solid md:hover:border-ink cursor-pointer text-left"
      >
        <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-none border-2 border-ink/30 text-ink/50 transition-opacity duration-150 motion-reduce:transition-none md:group-hover:opacity-0 text-2xl font-light min-w-[3rem] min-h-[3rem]" style={{ lineHeight: 1 }}>
          <span className="inline-flex items-center justify-center w-full h-full" style={{ paddingBottom: '0.08em' }}>+</span>
        </span>
        <span
          aria-hidden
          className="absolute inset-0 z-10 hidden md:flex items-center justify-center text-[17px] text-paper opacity-0 transition-opacity duration-150 motion-reduce:transition-none group-hover:opacity-100 pointer-events-none"
        >
          &gt;&nbsp;здесь может быть ваша компания
          <span className="cli-cursor inline-block w-[0.6em] h-[1.1em] ml-[0.6em] bg-[#8f9bff]" />
        </span>
      </button>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
          <div className="absolute inset-0 z-0 bg-black/85" onClick={() => setModalOpen(false)} aria-hidden />
          <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute -top-3 -right-3 w-14 h-14 rounded-none border-2 border-white/40 hover:border-white/70 flex items-center justify-center text-white/70 hover:text-white transition-all font-light"
              aria-label="Закрыть"
              style={{ lineHeight: '1', padding: 0, fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ✕
            </button>
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
