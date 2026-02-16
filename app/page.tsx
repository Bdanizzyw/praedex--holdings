// CONTEXT FOR COPILOT:
// Build the frontend for an investor-ready real-estate web app ("Praedex Holdings").
// Goal: Website-only MVP (no backend yet), demo data is fine.
// Stack: Next.js (App Router) + TypeScript + Tailwind CSS.
// Pages: Home, Properties list, Property details, List property form.
// Requirements:
// - Clean, professional design (Airbnb-like), responsive.
// - Use functional components, server components where suitable.
// - Keep styles in Tailwind classes.
// - Use mock/demo data in arrays.
// - Export components cleanly and keep code simple.
// Deliverables: Page components, a Navbar, a PropertyCard component.

import React from 'react'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to Praedex Holdings
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover premium investment properties with verified returns and professional management
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="/properties"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
            >
              Find Property
            </a>
            <a
              href="/list"
              className="bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition border border-white"
            >
              List Property
            </a>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Praedex Holdings?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Value Prop 1 */}
            <div className="text-center p-8 rounded-lg bg-gray-50">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-2xl font-bold mb-2">Location-Based Discovery</h3>
              <p className="text-gray-600">
                Find properties in prime locations with advanced filtering and real-time market insights.
              </p>
            </div>

            {/* Value Prop 2 */}
            <div className="text-center p-8 rounded-lg bg-gray-50">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-2xl font-bold mb-2">Verified Listings</h3>
              <p className="text-gray-600">
                All properties are verified and managed by professional real estate experts.
              </p>
            </div>

            {/* Value Prop 3 */}
            <div className="text-center p-8 rounded-lg bg-gray-50">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-bold mb-2">Scalable Portfolio</h3>
              <p className="text-gray-600">
                Build and manage a diversified investment portfolio with ease and transparency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
