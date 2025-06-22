'use client'

import { ReactNode } from 'react'
import { GlobalStyle } from './styles/global'


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>

        <GlobalStyle />
        
        {children}
      </body>
    </html>
  )
}
