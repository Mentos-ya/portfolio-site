'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AddCaseBlock() {
  const [modalOpen, setModalOpen] = useState(false)
  const [chestImgError, setChestImgError] = useState(false)

  useEffect(() => {
    if (modalOpen) setChestImgError(false)
  }, [modalOpen])

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="group relative w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center py-8 mt-6 mb-6 bg-white transition-[border-color,box-shadow] duration-300 hover:border-sky-400 hover:ring-1 hover:ring-sky-400/50 cursor-pointer text-left"
      >
        <div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" aria-hidden />
        <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-400 text-gray-500 group-hover:text-white group-hover:border-white/80 transition-colors duration-300 text-2xl font-light min-w-[3rem] min-h-[3rem]" style={{ lineHeight: 1 }}>
          <span className="inline-flex items-center justify-center w-full h-full" style={{ paddingBottom: '0.08em' }}>+</span>
        </span>
      </button>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModalOpen(false)} aria-hidden />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-200 text-center">
            {/* Анимация: положи гифку/картинку в public/images/chest-open.gif или chest-open.png */}
            <div className="flex justify-center mb-5 min-h-[8rem] items-center">
              {chestImgError ? (
                <span className="text-5xl" aria-hidden>📦</span>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src="/images/chest-open.png"
                  alt="Сундук открывается"
                  className="w-32 h-auto object-contain"
                  onError={(e) => {
                    const el = e.currentTarget
                    if (el.src.endsWith('.png')) {
                      el.src = '/images/chest-open.gif'
                    } else {
                      setChestImgError(true)
                    }
                  }}
                />
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ура, это матч!</h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Илья будет полезен вам для работы — свяжитесь с ним и обсудите ваше предложение.
            </p>
            <div className="flex gap-3">
              <Link
                href="/#contact"
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2.5 px-4 bg-gray-800 text-white text-sm font-medium rounded hover:bg-gray-700 transition text-center"
              >
                Связаться
              </Link>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="py-2.5 px-4 border border-gray-300 text-gray-600 text-sm font-medium rounded hover:bg-gray-50 transition"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
