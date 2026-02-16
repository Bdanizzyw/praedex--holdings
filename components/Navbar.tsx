// Build a responsive Navbar with brand "Praedex Holdings" and links to /properties and /list.
// Use Next.js <Link> and Tailwind for styling. Keep it minimal and clean.

import React from 'react'
import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Praedex Holdings
        </Link>
        <div className="flex gap-6">
          <Link
            href="/map"
            className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 font-medium transition pb-1"
          >
            🗺️ Map
          </Link>
          <Link
            href="/properties"
            className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 font-medium transition pb-1"
          >
            Properties
          </Link>
          <Link
            href="/list"
            className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 font-medium transition pb-1"
          >
            List Property
          </Link>
        </div>
      </div>
    </nav>
  )
}
