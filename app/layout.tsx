import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blockchain Remittance Platform',
  description: 'A modern blockchain-based remittance platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}