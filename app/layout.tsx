import type { Metadata } from 'next'
import { StoreProvider } from '@/components/StoreProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'AfriXPay - Blockchain Remittance Platform',
  description: 'Send money across Africa with blockchain technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}