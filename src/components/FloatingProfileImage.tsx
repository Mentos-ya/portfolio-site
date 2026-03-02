'use client'

import Image from 'next/image'

export default function FloatingProfileImage() {
  return (
    <div className="fixed top-8 right-32 z-40">
      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg hover:shadow-xl transition-all hover:scale-105">
        <Image
          src="/images/profile.jpg"
          alt="Profile"
          width={80}
          height={80}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </div>
  )
}
