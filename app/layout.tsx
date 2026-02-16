import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Praedex Holdings',
  description: 'Investor-ready real estate marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
