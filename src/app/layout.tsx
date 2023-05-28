'use client'

import { ReactNode } from 'react'
import './globals.css'
import { Roboto } from 'next/font/google'
import ContextWrapper from '@/contexts/ContextWrapper'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700', '900'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <ContextWrapper>
        <body className={roboto.className}>{children}</body>
      </ContextWrapper>
    </html>
  )
}
